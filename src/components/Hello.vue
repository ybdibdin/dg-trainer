<template>
  <div>
    <el-menu theme="light" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">Processing Center</el-menu-item>
      <el-menu-item index="2"><a href="http://www.deepglint.com" target="_blank">Contact us</a></el-menu-item>
    </el-menu>

    <div id="form">
      <el-form label-width="160px" class="demo-ruleForm">

        <div class="upload">
          <el-form :inline="true"  label-width="100px">
            <el-form-item label="Model" required>
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-success="handlesuccess"
                :on-remove="handleRemove">
                <el-button size="small" type="primary">Click to upload</el-button>
                <div slot="tip" class="el-upload__tip">u should upload Model  file</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="Solver" required>
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-success="handlesuccess"
                :on-remove="handleRemove">
                <el-button size="small" type="primary">Click to upload</el-button>
                <div slot="tip" class="el-upload__tip">u should upload Model      file</div>
              </el-upload>
            </el-form-item>
          </el-form>
          <el-form :inline="true" label-width="100px">
            <el-form-item label="TrainScript" required>
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-success="handlesuccess"
                :on-remove="handleRemove">
                <el-button size="small" type="primary">Click to upload</el-button>
                <div slot="tip" class="el-upload__tip">u should upload Model      file</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="PythonLayers" required>
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-success="handlesuccess"
                :on-remove="handleRemove">
                <el-button size="small" type="primary">Click to upload</el-button>
                <div slot="tip" class="el-upload__tip">u should upload Model   file</div>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>

        <el-form-item label="DockerImage" prop="name"  required>
          <el-input
            type="textarea"
            autosize
            placeholder="Please input"
            v-model="DockerImage">
          </el-input>
        </el-form-item>
        <el-form-item label="PythonLayer" prop="name" required>
          <el-input
            type="textarea"
            autosize
            placeholder="Please input"
            v-model="PythonLayer">
          </el-input>
        </el-form-item>
        <el-form-item label="TrainDataUri" prop="name" required>
          <el-input
            type="textarea"
            autosize
            placeholder="Please input"
            v-model="TrainDataUri">
          </el-input>
        </el-form-item>
        <el-form-item label="TestDataUri" prop="name" required>
          <el-input
            type="textarea"
            autosize
            placeholder="Please input"
            v-model="TestDataUri">
          </el-input>
        </el-form-item>



        <el-radio-group   class="checkboxshow">
          <el-checkbox v-model="Gpus1">Gpus--1</el-checkbox>
          <el-checkbox v-model="Cpus1">Cpus--1</el-checkbox>
          <el-checkbox v-model="Mem16">Mem--16</el-checkbox>
          <el-checkbox v-model="Disk256">Disk--256</el-checkbox>
          <el-checkbox v-model="Instance1">Instance--1</el-checkbox>
        </el-radio-group>


        <el-form-item class="submitbtn">
          <el-button type="primary" @click="submit">Create</el-button>
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
    </div>




</template>

<script>
  import ElRadio from "../../node_modules/element-ui/packages/radio/src/radio";
  import ElCheckbox from "../../node_modules/element-ui/packages/checkbox/src/checkbox";
  export default {
    data () {
      return {
        Instance1: true,
        Gpus1:true,
        Cpus1:true,
        Mem16:true,
        Disk256:true,
        activeIndex: '1',
        Modal:{},
        Solver:{},
        TrainScript:{},
        PythonLayer:{},
        DockerImage: '192.168.2.13:5000/caffe:cuda8v5_belt_2',
        TrainDataUri: 'nfs:///datacenter/image_data/belt/train_data',
        TestDataUri: 'nfs:///datacenter/image_data/belt/val_data',
        PythonLayer: 'nfs:///datacenter/test_training_platform/belt/bvlc_googlenet_driver_belt__iter_200000.caffemodel',
        resource: [
          { required: true, message: 'Please select activity resource', trigger: 'change' }
        ]
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
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#form{
  width: 45%;
}
.checkboxshow{
  margin-left: 70px;
  margin-top: 30px;
}
  .upload{
    margin-top: 20px;
    margin-left: 48px;
  }
  .submitbtn{
    margin-left: 40px;
    margin-top: 30px;
  }
</style>
