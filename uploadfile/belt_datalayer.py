#!/usr/bin/env python
#coding: utf-8

import scipy.misc
import skimage.io
import caffe
import json
import random
import cv2

import numpy as np
import os.path as osp
import os

class BeltDataLayer(caffe.Layer):
    def setup(self, bottom, top):
        param = json.loads(self.param_str)
        filelist = param["db_list"]
        self._batch_size  = param["batch_size"]
        self._label_num   = param["label_num"]
        self._height      = param["height"]
        self._width       = param["width"]
        self._crop_height = param["crop_height"]
        self._crop_width  = param["crop_width"]
        self._mean        = param["mean"]
        self._channel     = param["channel"]
        self._scale       = param["scale"]
        self._root_dir    = param["root_dir"]

        assert self._crop_height <= self._height
        assert self._crop_width  <= self._width
        assert self._channel in [1, 3]
        assert self._channel == len(self._mean)
        assert len(top) == 2
        assert self._batch_size > 0
        assert len(bottom) == 0
        assert self._scale > 0
        self._img_info = []
        self._mean = np.concatenate([
            np.ones((1, self._crop_height, self._crop_width),
                dtype=np.float32) * mean    \
            for mean in self._mean
        ])
        
        with open(filelist, 'r') as f:
            try:
                while True:
                    item = self._read_line(f)
                    self._img_info.append(item)
            except StopIteration:
                pass

        top[0].reshape(self._batch_size, self._channel, \
            self._crop_height, self._crop_width)
        top[1].reshape(self._batch_size, 1, 1)

    def _read_line(self, f):
        line = f.next().strip().split()
        file_name = line[0]
        # print file_name
        # print line[0]
        # print self._root_dir
        file_name = os.path.join(self._root_dir, file_name)
        # file_name = os.path.join( unicode(self._root_dir, 'utf-8'), line[0])
        # print file_name
        labels    = map(int, line[1:])
        # assert len(labels) == self._label_num
        return file_name, labels

    def reshape(self, bottom, top):
        pass

    def _read_image(self, path):
        if self._channel == 3:
            image = cv2.imread(path, cv2.CV_LOAD_IMAGE_COLOR)
            assert len(image.shape) == 3
            image = cv2.resize(image, (self._width, self._height))
            image = np.concatenate([
                image[:, :, i][np.newaxis, :, :] for i in range(3)
            ])
            # sys.stderr.write(str(image.shape) + '\n')
        else:
            image = cv2.imread(path, cv2.CV_LOAD_IMAGE_GRAYSCALE)
            assert len(image.shape) == 2
            image = cv2.resize(image, (self._width, self._height))
            image = np.reshape(image, (1, image.shape[0], image.shape[1]))
        offset_h = self._height - self._crop_height
        offset_w = self._width  - self._crop_width
        offset_h = random.randrange(0, offset_h)
        offset_w = random.randrange(0, offset_w)
        image = image[:,
            offset_h : (offset_h + self._crop_height),
            offset_w : (offset_w + self._crop_width)]

        # image flip
        if np.random.rand() > 0.5:
            image = cv2.flip(image, 1)
        
        # image blur
        # kernel = (1 + random.randrange(3), 1 + random.randrange(3))
        # kernel = (1 + random.randrange(19), 1 + random.randrange(19))
        # image  = cv2.blur(image, kernel)

        # contrast & brightness augmentation
        # alpha = 1 + np.random.rand() - 0.5 #[0.5, 1.5)
        # beta  = np.random.rand() * 100 - 50 #[-50, 50)

        # tmp = []
        # for pix in xrange(256):
        #     tmp.append(max(min(round(alpha*pix + beta), 255), 0))
        # parray = np.array(tmp, np.uint8)
        # image  = parray[image]

        image  = image.astype(np.float32)

        return (image - self._mean) / self._scale 

    def forward(self, bottom, top):
        for idx in range(self._batch_size):
            file_name, labels = random.choice(self._img_info)
            top[0].data[idx, ...] = self._read_image(file_name)
            top[1].data[idx, ...] = labels

    def backward(self, top, propagate_down, bottom):
        pass
