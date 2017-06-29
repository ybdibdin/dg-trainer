<template>
  <div>

  <div id="form" style="width: 60vw">
    <el-form label-width="180px" class="demo-ruleForm">



      <div class="upload">
        <el-form   label-width="180px">
          <el-form-item label="Model" required>
            <input type="file"  id="Model"/>
            <router-link to="/code"><el-button type="primary" size="mini"  value="Model">我要自己写</el-button></router-link>
            <el-dialog title="Model" :visible.sync="dialogModel">
              <el-input
                type="textarea"
                :autosize="{ minRows: 18, maxRows: 20}"
                placeholder="请输入内容"
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
              <codemirror v-model="code"
                          :options="editorOption"
                          @cursorActivity="onEditorCursorActivity"
                          @ready="onEditorReady"
                          @focus="onEditorFocus"
                          @blur="onEditorBlur">
              </codemirror>
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
                placeholder="请输入内容"
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


      <el-form ref="form" :model="form" label-width="180px">
        <el-form-item
          label="cpus" required>
          <el-input  v-model.number="form.cpus" auto-complete="off" :placeholder="this.sum[0][2]+' cpus available'"></el-input>
        </el-form-item>
        <el-form-item
          label="gpus" required>
          <el-input  v-model.number="form.gpus" auto-complete="off" :placeholder="this.sum[1][2]+' gpus available'"></el-input>
        </el-form-item>
        <el-form-item
          label="mem" required>
          <el-input  v-model.number="form.mem" auto-complete="off" :placeholder="this.sum[2][2]+' mem available'"></el-input>
        </el-form-item>
        <el-form-item
          label="disk" required>
          <el-input  v-model.number="form.disk" auto-complete="off" :placeholder="this.sum[3][2]+' disk available'"></el-input>
        </el-form-item>
      </el-form>

      <el-collapse accordion style="width: 586px;margin-left:180px">

        <el-collapse-item title="PretrainedModelUri">
          <el-form-item label="PretrainedModelUri" prop="name" required style="margin-left: -30px">
            <el-input v-model="PretrainedModelUri" ></el-input>
          </el-form-item>
          <el-form :model="dynamicValidateForm" ref="dynamicValidateForm"  class="demo-dynamic" >
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm.domains"
              :label="'PretrainedModelUri' + index"
              :key="domain.key"
              :prop="'domains.' + index + '.value'"
              style="width:500px" >
              <div style="display: flex">
                <el-input v-model="domain.value" ></el-input><el-button @click.prevent="removeDomain(domain)" >delete</el-button>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button @click="addDomain" type="primary">add</el-button>
              <el-button @click="resetForm('dynamicValidateForm')">reset</el-button>
            </el-form-item>
          </el-form>
        </el-collapse-item>

        <el-collapse-item title="TrainDataUri">
          <el-form-item label="TrainDataUri" prop="name" required style="margin-left: -85px">
            <el-input v-model="TrainDataUri" ></el-input>
          </el-form-item>
          <el-form :model="dynamicValidateForm1" ref="dynamicValidateForm1"  class="demo-dynamic" >
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm1.domains"
              :label="'TestDataUri' + index"
              :key="domain.key"
              :prop="'domains.' + index + '.value'"
              style="width:500px" >
              <div style="display: flex">
                <el-input v-model="domain.value" ></el-input><el-button @click.prevent="removeDomain1(domain)" >delete</el-button>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button @click="addDomain1" type="primary">add</el-button>
              <el-button @click="resetForm('dynamicValidateForm1')">reset</el-button>
            </el-form-item>
          </el-form>
        </el-collapse-item>

        <el-collapse-item title="TestDataUri" >
          <el-form-item label="TestDataUri" prop="name" required style="margin-left: -85px">
            <el-input v-model="TestDataUri" ></el-input>
          </el-form-item>
          <el-form :model="dynamicValidateForm2" ref="dynamicValidateForm2"  class="demo-dynamic" >
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm2.domains"
              :label="'TestDataUri' + index"
              :key="domain.key"
              :prop="'domains.' + index + '.value'"
              style="width:500px" >
              <div style="display: flex">
                <el-input v-model="domain.value" ></el-input><el-button @click.prevent="removeDomain2(domain)" >delete</el-button>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button @click="addDomain2" type="primary">add</el-button>
              <el-button @click="resetForm('dynamicValidateForm2')">reset</el-button>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>

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
  import ElForm from "../../node_modules/element-ui/packages/form/src/form";
  export default {
    components: {ElForm},
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
        form:{
            cpus:'',
            gpus:'',
            mem:'',
            disk:''
        },
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
        },
        dynamicValidateForm1: {
          domains: [{
            value: ''
          }],
        },
        dynamicValidateForm2: {
          domains: [{
            value: ''
          }],
        },
        code: `aaa bbb ccc 111 eee fff ggg  function(){}`,
        editorOption: {
          tabSize: 124,
          matchBrackets: true,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          mode: 'mymode',
          theme: 'base16-light',
          extraKeys: {
            "Ctrl": "autocomplete" ,
            'F11'(cm) {
              cm.setOption("fullScreen", !cm.getOption("fullScreen"))
            },
            'Esc'(cm) {
              if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false)
            }},
          foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
          // 选中文本自动高亮，及高亮方式
          styleSelectedText: true,
          highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
          // more codemirror config...
          // 如果有hint方面的配置，也应该出现在这里
          mode: {
            name: 'javascript',
          },


        }

      }
    },
    computed:{

      ...mapState({
        docker:state=>state.data.docker,
        dockertag:state=>state.data.dockertag,
        sum:state=>state.data.sum
      }),
      editor() {
        return this.$refs.myEditor.editor
      }
    },
    methods:{
      onEditorCursorActivity(codemirror) {
        console.log('onEditorCursorActivity', codemirror)
      },
      onEditorReady(codemirror) {
        console.log('onEditorReady', codemirror)
      },
      onEditorFocus(codemirror) {
        console.log('onEditorFocus', codemirror)
      },
      onEditorBlur(codemirror) {
        console.log('onEditorBlur', codemirror)
      },
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
        var resPMU=this.PretrainedModelUri;
        var resTDU=this.TrainDataUri;
        var resTDU1=this.TestDataUri;
        if(this.dynamicValidateForm.domains.length>0) {
          this.dynamicValidateForm.domains.forEach(function (ele, index) {
            resPMU += ";" + ele.value;
          })
        }
        if(this.dynamicValidateForm1.domains.length>0) {
          this.dynamicValidateForm1.domains.forEach(function (ele, index) {
            resTDU += ";" + ele.value;
          })
        }
        if(this.dynamicValidateForm2.domains.length>0) {
          this.dynamicValidateForm2.domains.forEach(function (ele, index) {
            resTDU1 += ";" + ele.value;
          })
        }
        console.log(resPMU,resTDU,resTDU1);
        var form=new FormData();
        form.append('Model',document.getElementById('Model').files[0]);
        form.append('TranScript',document.getElementById('TrainScript').files[0]);
        form.append('Solver',document.getElementById('Solver').files[0]);
        form.append('PythonLayers',document.getElementById('PythonLayers').files[0]);
        form.append('DockerImage',this.DockerImage);
        form.append('TrainDataUri',resTDU);
        form.append('TestDataUri',resTDU1);
        form.append('PretrainedModelUri',resPMU);
        form.append('Gpus',this.form.gpus);
        form.append('Cpus',this.form.cpus);
        form.append('Mem',this.form.mem);
        form.append('Disk',this.form.disk);
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      removeDomain1(item) {
        var index = this.dynamicValidateForm1.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains1.splice(index, 1)
        }
      },
      removeDomain2(item) {
        var index = this.dynamicValidateForm2.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm2.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      },
      addDomain1() {
        this.dynamicValidateForm1.domains.push({
          value: '',
          key: Date.now()
        });
      },
      addDomain2() {
        this.dynamicValidateForm2.domains.push({
          value: '',
          key: Date.now()
        });
      }
    }
  }


</script>

<style scoped>

</style>
