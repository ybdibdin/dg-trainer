<template>
  <div>

    <div class="nav">
      <el-menu theme="light" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <router-link to="/"><el-menu-item index="1">Processing Center</el-menu-item></router-link>
        <router-link to="/create"><el-menu-item index="3">create new task</el-menu-item></router-link>
        <el-menu-item index="2" style="float: right"><a href="http://www.deepglint.com" target="_blank">Contact us</a></el-menu-item>
      </el-menu>
    </div>


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
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        activeIndex: '3',
        activeName: 'first',
        taskid:' ',
        DockerImage: '192.168.2.13:5000/caffe:cuda8v5_belt_2',
        TrainDataUri: 'nfs:///datacenter/image_data/belt/train_data',
        TestDataUri: 'nfs:///datacenter/image_data/belt/val_data',
        PretrainedModelUri: 'nfs:///datacenter/test_training_platform/belt/bvlc_googlenet_driver_belt__iter_200000.caffemodel',
      }
    },
    methods:{
      handleSelect: function (key, keyPath) {
        //console.log(key, keyPath)
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
//          this.text1=res.request.responseText;
//          this.taskid=res.request.responseText.split("\"")[3];
          this.$notify({
            title: '成功',
            message: '创建任务成功,taskid:'+res.request.responseText.split("\"")[3],
            type: 'success'
          });

        })
      },
    }
  }


</script>

<style scoped>

</style>
