<template>
  <div class="nav">
    <el-menu theme="light" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">Processing Center</el-menu-item>
      <el-menu-item index="2"><a href="http://www.deepglint.com" target="_blank">Contact us</a></el-menu-item>
    </el-menu>

    <div id="form">
      <el-form label-width="180px" class="demo-ruleForm">



        <div class="upload">
          <el-form   label-width="180px">
            <el-form-item label="Model" required>
              <input type="file"  id="Model"/>
            </el-form-item>
            <el-form-item label="Solver" required>
              <input type="file"  id="Solver"/>
            </el-form-item>
          </el-form>
          <el-form  label-width="180px">
            <el-form-item label="TrainScript" required>
              <input type="file"  id="TrainScript"/>
            </el-form-item>
            <el-form-item label="PythonLayers" required>
              <input type="file"  id="PythonLayers"/>
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
        <el-form-item label="PretrainedModelUri" prop="name" required>
          <el-input
            type="textarea"
            autosize
            placeholder="Please input"
            v-model="PretrainedModelUri">
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


        <el-form-item class="submitbtn">
          <el-button type="primary" @click="submit">Create</el-button>
          <el-button @click="deletetask">Delete</el-button>
        </el-form-item>
      </el-form>
    </div>


    <div id="logpanel">

      <el-radio-group   class="checkboxshow">
        <el-checkbox v-model="Gpus1">Gpus--1</el-checkbox>
        <el-checkbox v-model="Cpus1">Cpus--1</el-checkbox>
        <el-checkbox v-model="Mem16">Mem--16</el-checkbox>
        <el-checkbox v-model="Disk256">Disk--256</el-checkbox>
        <el-checkbox v-model="Instance1">Instance--1</el-checkbox>
      </el-radio-group>

      <el-tabs v-model="activeName">
        <el-tab-pane label="task" name="first"><el-input
          type="textarea"
          :rows="25"
          v-model="text1">
        </el-input></el-tab-pane>
        <el-tab-pane label="tasks list" name="second"><el-input
          type="textarea"
          :rows="25"
          v-model="text2">
        </el-input></el-tab-pane>
        <el-tab-pane label="task log" name="third"><el-input
          type="textarea"
          :rows="25"
          v-model="text3">
        </el-input></el-tab-pane>
        <el-tab-pane label="task info" name="forth"><el-input
          type="textarea"
          :rows="25"
          v-model="text4">
        </el-input></el-tab-pane>
        <el-tab-pane label="docker images" name="fifth"><el-input
          type="textarea"
          :rows="25"
          v-model="text5">
        </el-input></el-tab-pane>
        <el-tab-pane label="get resources" name="sixth"><el-input
          type="textarea"
          :rows="25"
          v-model="text6">
        </el-input></el-tab-pane>

      </el-tabs>
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
        activeName: 'first',
        taskid:' ',
        text1:'waiting ...',
        text2:'waiting ...',
        text3:'waiting ...',
        text4:'waiting ...',
        text5:'waiting ...',
        text6:'waiting ...',
        DockerImage: '192.168.2.13:5000/caffe:cuda8v5_belt_2',
        TrainDataUri: 'nfs:///datacenter/image_data/belt/train_data',
        TestDataUri: 'nfs:///datacenter/image_data/belt/val_data',
        PretrainedModelUri: 'nfs:///datacenter/test_training_platform/belt/bvlc_googlenet_driver_belt__iter_200000.caffemodel',
      }
    },
    watch:{
      activeName:function (val, oldval) {
          console.log(val,oldval);
        if(val == 'second'&&this.text2 == 'waiting ...'){
            this.second();
        }else if(val == 'third'&&this.text3 == 'waiting ...'){
            this.third();
        }else if(val == 'forth'&&this.text4 == 'waiting ...'){
          this.forth();
        }else if(val == 'fifth'&&this.text5 == 'waiting ...'){
          this.fifth();
        }else if(val == 'sixth'&&this.text6 == 'waiting ...'){
          this.sixth();
        }
      }

    },
    methods: {
      handleSelect: function (key, keyPath) {
        console.log(key, keyPath)
      },
      handlesuccessM: function (response, file, fileList) {
        this.Modal=file;
        console.log(this.Modal);

      },
      handlesuccessT: function (response, file, fileList) {
        this.TrainScript=file;
        //console.log(this.Modal);
      },
      handlesuccessS: function (response, file, fileList) {
        this.Solver=file;
        //console.log(this.Modal);
      },
      handlesuccessP: function (response, file, fileList) {
        this.PythonLayers=file;
        //console.log(this.Modal);
      },
      submit: function () {
//          console.log(document.getElementById('Model').files[0],document.getElementById('TrainScript').files[0],
 //           document.getElementById('Solver').files[0],document.getElementById('PythonLayers').files[0]);
                 //console.log(this.text1)
        var form=new FormData();
        form.append('Model',document.getElementById('Model').files[0]);
        form.append('TranScript',document.getElementById('TrainScript').files[0]);
        form.append('Solver',document.getElementById('Solver').files[0]);
        form.append('PythonLayers',document.getElementById('PythonLayers').files[0]);
        form.append('DockerImage',this.DockerImage);
        form.append('TrainDataUri',this.TrainDataUri);
        form.append('TestDataUri',this.TestDataUri);
        form.append('PretrainedModelUri',this.PretrainedModelUri);
        form.append('Gpus','1');
        form.append('Cpus','1');
        form.append('Mem','16');
        form.append('Disk','256');
        form.append('Instances','1');
        //console.log(this.DockerImage);
        this.$http({
          url:'http://192.168.6.66:8081/dgtrainer/v1/task',
          method:'post',
          data:form,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then((res)=>{
            //console.log(res.request.responseText.split("\"")[3])
          //console.log(typeof res.request.responseText.split("\""));
            this.text1=res.request.responseText;
            this.taskid=res.request.responseText.split("\"")[3];

        })
      },
      second:function () {
        this.$http.get('http://192.168.6.66:8081/dgtrainer/v1/tasks').then(response => {
          // success callback
          this.text2=response.request.responseText;
        }, response => {
          // error callback
        })
      },
      third:function () {
        this.$http.get('http://192.168.6.66:8081/dgtrainer/v1/task/'+this.taskid+'/logs').then(response => {
          // success callback
          this.text3=response.request.responseText;
        }, response => {
          // error callback
        })

      },
      forth:function () {
           this.$http.get('http://192.168.6.66:8081/dgtrainer/v1/task/'+this.taskid).then(response => {
             // success callback
             this.text4=response.request.responseText;
           }, response => {
             // error callback
           })
      },
      fifth:function () {
         this.$http.get('http://192.168.6.66:8081/dgtrainer/v1/images').then(response => {
           // success callback
           this.text5=response.request.responseText;
         }, response => {
           // error callback
         })
      },
      sixth:function () {
        this.$http.get('http://192.168.6.66:8081/dgtrainer/v1/resources').then(response => {
          // success callback
          this.text6=response.request.responseText;
        }, response => {
          // error callback
          })
      },
      deletetask:function () {
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE','http://192.168.6.66:8081/dgtrainer/v1/task/'+this.taskid+'?Status=333&Message=aaaaaaa', true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
            console.log('success');
          }
        }
        xhr.setRequestHeader("Content-Type", "application/json ;charset=utf-8");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send();
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
  float: left;
  width: 45%;
}
.checkboxshow{
  margin-left: 70px;
  margin-top: 30px;
}
  .upload{
    margin-top: 10px;
    margin-left: 0;
  }
  .submitbtn{
    margin-left: 40px;
    margin-top: 30px;
  }
  #logpanel{
    margin-left:50%;
    margin-top: 0;
    width: 48%;
  }
  .nav{


  }
</style>
