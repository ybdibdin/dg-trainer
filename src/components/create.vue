<template>

    <div style="width: 80%;height:90%;margin:0 auto">
      <el-form label-width="180px" class="demo-ruleForm" style="height: 70%">
      <div class="upload" style="display: flex;flex-wrap: wrap;height: 60%;">
        <el-form   label-width="180px">
          <el-form-item label="Model" required>
            <input type="file"  id="Model"/>
            <el-button type="primary"  v-on:click="dialogModel=true" size="mini"  value="Model">我要自己写</el-button>
          </el-form-item>
          <el-dialog title="Model" :visible.sync="dialogModel" size="full">
            <codemirror v-model="code"
                        :options="editorOption"
                        @cursorActivity="onEditorCursorActivity"
                        @ready="onEditorReady"
                        @focus="onEditorFocus"
                        @blur="onEditorBlur"
                        >
            </codemirror>
            <div slot="footer">
            <el-button @click="dialogModel = false" size="small">Cancel</el-button>
            <el-button type="primary" size="small" v-on:click="writeModel" >Submit</el-button>
            </div>
          </el-dialog>
          <el-form-item label="Solver" required>
            <input type="file"  id="Solver"/>
            <el-button type="primary" size="mini" v-on:click="dialogSolver = true" value="Solver">我要自己写</el-button>
          </el-form-item>
          <el-dialog title="Solver" :visible.sync="dialogSolver" size="full">
            <codemirror v-model="code"
                        :options="editorOption"
                        @cursorActivity="onEditorCursorActivity"
                        @ready="onEditorReady"
                        @focus="onEditorFocus"
                        @blur="onEditorBlur"
                        style="height: 100vh;">
            </codemirror>
            <div slot="footer">
            <el-button @click="dialogSolver = false" size="small" style="margin-top: 50px">Cancel</el-button>
            <el-button type="primary" size="small" v-on:click="writeSolver" >Submit</el-button>
            </div>
          </el-dialog>
        </el-form>
        <el-form  label-width="180px">
          <el-form-item label="TrainScript" required>
            <input type="file"  id="TrainScript"/>
            <el-button type="primary" size="mini" v-on:click="dialogScript=true" value="TranScript">我要自己写</el-button>
          </el-form-item>
          <el-dialog title="TrainScript" :visible.sync="dialogScript" size="full">

            <codemirror @blur="onEditorBlur"
                        style="height: 600px"
                        v-model="code"
                        :options="editorOption"
                        @cursorActivity="onEditorCursorActivity"
                        @ready="onEditorReady"
                        @focus="onEditorFocus"
                        >
            </codemirror>

            <div slot="footer">
            <el-button @click="dialogScript = false" size="small">Cancel</el-button>
            <el-button type="primary" size="small" v-on:click="writeScript">Submit</el-button>
            </div>
          </el-dialog>
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
      <el-dropdown style="display: inline-block"  @command="handleCommand" @click="handleCdocker">
      <span class="el-dropdown-link">
        docker<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in dockersave" :command="item" :key="item">{{item}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown style="display: inline-block"  @command="handletag">
        <span class="el-dropdown-link">
          dockertag<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="items in dockertag[this.dockerindex]" :command="items" :key="items">{{items}}</el-dropdown-item>
          <el-dropdown-item command="5" divided><router-link to="/image">create new image</router-link></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-form ref="form" :rules="rules" :model="form" label-width="180px" style="display: flex;justify-content: flex-start;flex-wrap: wrap">
        <el-form-item
          label="cpus" prop="cpus" >
          <el-input  v-model="form.cpus" type="number" auto-complete="off" :placeholder="this.resourcelist[0]+' cpus available'" style="order: 4"></el-input>
        </el-form-item>
        <el-form-item
          label="gpus" prop="gpus" >
          <el-input  v-model="form.gpus" type="number" auto-complete="off" :placeholder="this.resourcelist[1]+' gpus available'" style="order: 12"></el-input>
        </el-form-item>
        <el-form-item
          label="mem" prop="mem" >
          <el-input  v-model="form.mem" type="number" auto-complete="off" :placeholder="this.resourcelist[2]+' mem available'" style="order: 4"></el-input>
        </el-form-item>
        <el-form-item
          label="disk" prop="disk" >
          <el-input  v-model="form.disk" type="number" auto-complete="off" :placeholder="this.resourcelist[3]+' disk available'" style="order: 4"></el-input>
        </el-form-item>
      </el-form>
      </el-form>
      <div style="display: flex;flex-wrap: wrap;justify-content:center;height: 25%;">
          <el-form :model="dynamicValidateForm" ref="dynamicValidateForm"  class="demo-dynamic" :inline="true">
            <!--<el-form-item label="PretrainedModelUri" prop="name" required style="margin-top: -20px;width: 450px;">-->
              <!--<el-input v-model="PretrainedModelUri" style="margin-left: 150px;width: 200px"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm.domains"
              :label="'PretrainedModelUri' + index"
              :key="domain.key"
              :prop="'domains.' + index + '.value'"
              style="width:800px;margin-left: 75px"
              >
              <div>
                  <el-input v-model="domain.value" style="float: left;width: 300px"></el-input>
                  <el-button @click.prevent="removeDomain(domain)" >delete</el-button>
                  <el-button @click="addDomain" type="primary" v-if="index==dynamicValidateForm.domains.length-1">add</el-button>
                  <el-button @click="resetForm('dynamicValidateForm')" v-if="index==dynamicValidateForm.domains.length-1">reset</el-button>
              </div>
            </el-form-item>
          </el-form>

          <el-form :model="dynamicValidateForm1" ref="dynamicValidateForm1"  class="demo-dynamic" >
            <!--<el-form-item label="TrainDataUri" prop="name" required style="margin-top: -15px">-->
              <!--<el-input v-model="TrainDataUri" ></el-input>-->
            <!--</el-form-item>-->
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm1.domains"
              :label="'TrainDataUri' + index"
              :key="domain.key"
              :prop="'domains.' + index + '.value'"
              style="width:800px;margin-left: 150px" >
              <div>
                <el-input v-model="domain.value" style="float: left;width: 300px;"></el-input>
                <el-button @click.prevent="removeDomain1(domain)" >delete</el-button>
                <el-button @click="addDomain1" type="primary" v-if="index==dynamicValidateForm1.domains.length-1">add</el-button>
                <el-button @click="resetForm('dynamicValidateForm1')" v-if="index==dynamicValidateForm1.domains.length-1">reset</el-button>
              </div>
            </el-form-item>
          </el-form>

          <el-form :model="dynamicValidateForm2" ref="dynamicValidateForm2"  class="demo-dynamic" >
            <!--<el-form-item label="TestDataUri" prop="name" required style="margin-top: -20px">-->
              <!--<el-input v-model="TestDataUri" ></el-input>-->
            <!--</el-form-item>-->
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm2.domains"
              :label="'TestDataUri' + index"
              :key="domain.key"
              :prop="'domains.' + index + '.value'"
              style=" width:800px;margin-left: 160px;" >
              <div >
                <el-input v-model="domain.value" style="float: left;width: 300px;"></el-input>
                <el-button @click.prevent="removeDomain2(domain)" >delete</el-button>
                <el-button @click="addDomain2" type="primary" v-if="index==dynamicValidateForm2.domains.length-1">add</el-button>
                <el-button @click="resetForm('dynamicValidateForm2')" v-if="index==dynamicValidateForm2.domains.length-1">reset</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      <el-button type="primary" @click="submit" style="float: right;margin:0 100px 20px 0" size="large">Create<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
</template>


<script>
  import { mapState, mapMutations } from 'vuex'
  import router from 'vue-router'
  import ElForm from "../../node_modules/element-ui/packages/form/src/form";
  import ElCard from "../../node_modules/element-ui/packages/card/src/main";
  export default {
    components: {
      ElCard,
      ElForm},
    data () {
      var validatecpus = (rule, value, callback) => {
        if (value >this.resourcelist[0]) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validategpus = (rule, value, callback) => {
        if (value >this.resourcelist[1]) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatemem = (rule, value, callback) => {
        if (value >this.resourcelist[2]) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatedisk = (rule, value, callback) => {
        if (value >this.resourcelist[3]) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        activeName: 'first',
        deter:false,
        dockersave:[],
        dockerindex:undefined,
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
        rules:{
          cpus:[ { required: true, trigger: 'blur' },
            {validator: validatecpus, message: '必须在资源范围内', trigger: 'blur' }],
          gpus:[{ required: true, trigger: 'blur' },
            {  validator: validategpus ,message: '必须在资源范围内', trigger: 'blur' }],
          mem:[{ required: true, trigger: 'blur' },
            {  validator: validatemem ,message: '必须在资源范围内', trigger: 'blur' }],
          disk:[{ required: true, trigger: 'blur' },
            {  validator: validatedisk ,message: '必须在资源范围内', trigger: 'blur' }]
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
          matchBrackets: true,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          theme: 'base16-light',
          height:800,
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
            json: true,

            // or ext
            ext: 'js',
          },


        }

      }
    },
    computed:{
      resourcelist(){
        return this.$store.getters.resourcestate;
      },
      ...mapState({
        docker:state=>state.data.docker,
        dockertag:state=>state.data.dockertag
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
          if(this.docker.indexOf(command)>=0){
              this.dockerindex=this.docker.indexOf(command);
          }
          var temp=this.DockerImage.split(':');
          var temp1=temp[1].split('/');
          temp1[1]=command;
          this.DockerImage=temp[0]+':'+temp1[0]+'/'+temp1[1]+':'+temp[2];
      },
      handleCdocker(){

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
            temp[2] = command;
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
    },
    created(){
        this.$store.dispatch('getImage',this)
//      var that=this;
//      var getresource=setInterval(function () {
//        if(that.deter == true){
//          clearInterval(that.getresource);
//        }else{
//          that.$store.dispatch('getImage', that);
//        }
//      },5000)
    },
    watch:{
       docker(){
           this.dockersave=this.docker;
       }
    },






//    beforeRouteLeave (to, from, next) {
//      // 导航离开该组件的对应路由时调用
//      // 可以访问组件实例 `this`
//      this.deter=true;
//      next();
//    }


  }


</script>

<style scoped>

</style>
