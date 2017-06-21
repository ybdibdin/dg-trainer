<template>
  <div>

  <div id="form" style="width: 60vw">
    <el-form label-width="180px" class="demo-ruleForm">



      <div class="upload">
        <el-form   label-width="180px">
          <el-form-item label="Model" required>
            <input type="file"  id="Model"/>
            <el-button type="primary" size="mini" v-on:click="dialogModel = true" value="Model">我要自己写</el-button>
            <el-dialog title="Model" :visible.sync="dialogModel">
              <el-input
                type="textarea"
                :autosize="{ minRows: 18, maxRows: 20}"
                placeholder="请输入内容请问"
                v-model="textarea">
              </el-input>
              <el-button @click="dialogModel = false" size="small">Cancel</el-button>
              <el-button type="primary" size="small" v-on:click="writeModel" value="Model">Submit</el-button>
            </el-dialog>
          </el-form-item>
          <el-form-item label="Solver" required>
            <input type="file"  id="Solver"/>
            <el-button type="primary" size="mini" v-on:click="dialogSolver = true" value="Solver">我要自己写</el-button>
            <el-dialog title="Solver" :visible.sync="dialogSolver">
              <el-input
                type="textarea"
                :autosize="{ minRows: 18, maxRows: 20}"
                placeholder="请输入内容请问"
                v-model="textarea1">
              </el-input>
              <el-button @click="dialogSolver = false" size="small">Cancel</el-button>
              <el-button type="primary" size="small" v-on:click="writeSolver" >Submit</el-button>
            </el-dialog>
          </el-form-item>
        </el-form>
        <el-form  label-width="180px">
          <el-form-item label="TrainScript" required>
            <input type="file"  id="TrainScript"/>
            <el-button type="primary" size="mini" v-on:click="dialogScript=true" value="TranScript">我要自己写</el-button>
            <el-dialog title="TrainScript" :visible.sync="dialogScript">
              <el-input
                type="textarea"
                :autosize="{ minRows: 18, maxRows: 20}"
                placeholder="请输入内容请问"
                v-model="textarea2">
              </el-input>
              <el-button @click="dialogScript = false" size="small">Cancel</el-button>
              <el-button type="primary" size="small" v-on:click="writeScript">Submit</el-button>
            </el-dialog>
          </el-form-item>
          <el-form-item label="PythonLayers" required>
            <input type="file"  id="PythonLayers"/>
          </el-form-item>
        </el-form>
      </div>

      <el-form-item style="display: inline-block;width: 70%;" label="DockerImage" prop="name"  required>
        <el-input
          type="textarea"
          autosize
          placeholder="Please input"
          v-model="DockerImage">
        </el-input>
      </el-form-item>
      <el-dropdown style="display: inline-block"  @command="handleCommand">
      <span class="el-dropdown-link">
        docker<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">{{docker[0]}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown style="display: inline-block"  @command="handletag">
        <span class="el-dropdown-link">
          dockertag<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">{{dockertag[0]}}</el-dropdown-item>
          <el-dropdown-item command="1">{{dockertag[1]}}</el-dropdown-item>
          <el-dropdown-item command="2">{{dockertag[2]}}</el-dropdown-item>
          <el-dropdown-item command="3">{{dockertag[3]}}</el-dropdown-item>
          <el-dropdown-item command="4">{{dockertag[4]}}</el-dropdown-item>
          <el-dropdown-item command="5" divided><router-link to="/image">create new image</router-link></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>


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
  import { mapState, mapMutations } from 'vuex'
  import router from 'vue-router'
  export default {
    data () {
      return {
        activeName: 'first',
        taskid:' ',
        DockerImage: '192.168.2.13:5000/caffe:cuda8v5_belt_2',
        TrainDataUri: 'nfs:///datacenter/image_data/belt/train_data',
        TestDataUri: 'nfs:///datacenter/image_data/belt/val_data',
        PretrainedModelUri: 'nfs:///datacenter/test_training_platform/belt/bvlc_googlenet_driver_belt__iter_200000.caffemodel',
        dialogModel:false,
        dialogSolver:false,
        dialogScript:false,
        textarea:"",
        textarea1:"",
        textarea2:"",

      }
    },
    computed:{

      ...mapState({
        docker:state=>state.data.docker,
        dockertag:state=>state.data.dockertag
      })
    },
    methods:{
      handleCommand(command) {

      },
      writeModel(){
          this.dialogModel = false;

      },
      writeSolver(){
          this.dialogSolver=false;
      },
      writeScript(){
          this.dialogScript=false;

      },
      handletag(command) {
          if(command == 5){

          }else {
            var temp = this.DockerImage.split(':');
            temp[2] = this.dockertag[command];
            this.DockerImage = temp[0] + ':' + temp[1] + ':' + temp[2];
          }
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
