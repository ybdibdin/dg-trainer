<template>
  <div>
    <el-card class="box-card">
      <el-button size="small" type="danger" @click="">delete</el-button>
      <el-button size="small" type="info" @click="">stop</el-button>
      <div class="text item">
       task-id: {{showtask[this.index].name}}
      </div>
      <div class="text item">
        cmd: {{showtask[this.index].cmd||'cmd is null' }}
      </div>
      <div class="text item">
        waiting-time: {{showtask[this.index].WaitingTime }}
      </div>
      <div class="text item">
        dependency_uris: {{showtask[this.index].dependency_uris||'dependency_uris is null' }}
      </div>
      <div class="text item">
        docker_image: {{showtask[this.index].docker_image||'docker_image is null' }}
      </div>
      <div class="text item">
        instances: {{showtask[this.index].instances }}
      </div>
      <div class="text item">
        cpus: {{showtask[this.index].resources.cpus}}
      </div>
      <div class="text item">
        gpus: {{showtask[this.index].resources.gpus }}
      </div>
      <div class="text item">
        mem: {{showtask[this.index].resources.mem }}
      </div>
      <div class="text item">
        disk: {{showtask[this.index].resources.disk }}
      </div>
      <div class="text item">
        task-state: {{showtask[this.index].state }}
      </div>
      <div class="text item">
        state-message: {{showtask[this.index].state_message||'no state message to show' }}
      </div>
    </el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-left: 500px">
      <el-tab-pane label="show me the chart" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="show me the detail" name="second">配置管理</el-tab-pane>
    </el-tabs>

  </div>
</template>


<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        index:this.$route.params.index,
        activeName: 'first',
        deter:false
      }
    },
    methods:{
      handleClick(tab, event)
      {
        console.log(tab, event);
      },
      getAll:()=>{
          if(this.deter) {
            this.$store.dispatch('getTaskList', {
              that: that,
              id: that.tableData[index].name
            })
          }
      }

    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        console.log('to:',to,'from:',from)
      },
      activeName:(oldv,newv)=>{
          console.log(newv);
          if(newv == 'second'){
              this.deter=true;
            this.getAll();
          }else{
              this.deter=false;
          }
   }
    },
    computed:{
      ...mapState({
        showtask:state=>state.data.tasklist
      })
    }
  }


</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
    float: left;
  }
</style>
