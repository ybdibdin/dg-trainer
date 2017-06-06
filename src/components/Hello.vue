<template>
  <div>
    <el-menu theme="light" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">Processing Center</el-menu-item>
      <el-menu-item index="2"><a href="http://www.deepglint.com" target="_blank">Contact us</a></el-menu-item>
    </el-menu>

    <div class="upload">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-success="handlesuccess"
        :on-remove="handleRemove">
        <el-button size="small" type="primary">Click to upload</el-button>
        <div slot="tip" class="el-upload__tip">u should upload Model file</div>
      </el-upload>

      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-success="handlesuccess"
        :on-remove="handleRemove"
     >
        <el-button size="small" type="primary">Click to upload</el-button>
        <div slot="tip" class="el-upload__tip">u should upload Solver file</div>
      </el-upload>

      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-success="handlesuccess"
        :on-remove="handleRemove"
        >
        <el-button size="small" type="primary">Click to upload</el-button>
        <div slot="tip" class="el-upload__tip">u should upload TrainScript file</div>
      </el-upload>


      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-success="handlesuccess"
        :on-remove="handleRemove"
        >
        <el-button size="small" type="primary">Click to upload</el-button>
        <div slot="tip" class="el-upload__tip">u should upload PythonLayers file</div>
      </el-upload>
    </div>

    <div class="textarea">
      <el-input
        type="textarea"
        autosize
        placeholder="Please input"
        v-model="DockerImage">
      </el-input>
      <el-input
        type="textarea"
        autosize
        placeholder="Please input"
        v-model="TrainDataUri">
      </el-input>
      <el-input
        type="textarea"
        autosize
        placeholder="Please input"
        v-model="TestDataUri">
      </el-input>
      <el-input
        type="textarea"
        autosize
        placeholder="Please input"
        v-model="PretrainedModelUri">
      </el-input>
    </div>

    <div class="input">
      <el-input placeholder="Please input" v-model="Cpus"></el-input>
      <el-input placeholder="Please input" v-model="Gpus"></el-input>
      <el-input placeholder="Please input" v-model="Mem"></el-input>
      <el-input placeholder="Please input" v-model="Disk"></el-input>
      <el-input placeholder="Please input" v-model="Instance"></el-input>
    </div>
    <el-button type="primary" v-on:click="submit">Run</el-button>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        activeIndex: '1',
        Modal:{},
        Solver:{},
        TrainScript:{},
        PythonLayers:{},
        DockerImage: '192.168.2.13:5000/caffe:cuda8v5_belt_2',
        TrainDataUri: 'nfs:///datacenter/image_data/belt/train_data',
        TestDataUri: 'nfs:///datacenter/image_data/belt/val_data',
        PretrainedModelUri: 'nfs:///datacenter/test_training_platform/belt/bvlc_googlenet_driver_belt__iter_200000.caffemodel',
        Cpus: '1',
        Gpus: '1',
        Mem: '16',
        Disk: '265',
        Instance: '1'
      }
    },
    methods: {
      handleSelect: function (key, keyPath) {
        console.log(key, keyPath)
      },
      handleRemove: function (file, fileList) {
        console.log(file, fileList)
      },
      handlesuccess: function (response, file, fileList) {
        this.Modal=file;
        console.log(this.Modal);
      },
      submit: function () {
        var xhr = new XMLHttpRequest()
        xhr.open('POST','http://192.168.6.66:8081/dgtrainer/v1/task', true)
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            alert('success');
          }
        }
        xhr.setRequestHeader("Content-Type", "application/json ;charset=utf-8")
        xhr.setRequestHeader("Accept", "application/json")
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost")
        xhr.send()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .upload{
    width: 20vw;
  }

  .textarea{
    width: 20vw;
  }
</style>
