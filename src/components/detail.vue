<template>
  <div>
    <el-card class="box-card">
      <div class="text item">
       task-id: {{showtask[this.index].name }}
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

  </div>
</template>


<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        index:this.$route.params.index

      }
    },
    methods:{

    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        console.log('to:',to,'from:',from)
      }
    },
    computed:{
      ...mapState({
        showtask:state=>state.data.tasklist
      })
    },
    created: {

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
  }
</style>
