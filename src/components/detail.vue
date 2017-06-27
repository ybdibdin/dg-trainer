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
    <el-tabs v-model="activeName" @tab-click="handleClick" style="width: 100%;height: 90vh;">
      <el-tab-pane label="show me the chart" name="first">
        <div id="main" style="height: 500px;width: 1000px;"></div>
      </el-tab-pane>
      <el-tab-pane label="show me the detail" name="second">
        <el-table
          :data="filelist"
          stripe
        :height=420>
          <el-table-column
            prop="name"
            label="filelist----source"
          >
          </el-table-column>
          <el-table-column label="下载">
            <template scope="scope">
              <el-button
                size="small"
                @click="handleDownload(scope.$index, scope.row)">download</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-input type="textarea" :rows="15" v-model="logsdetail" placeholder="no data"></el-input>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>


<script>
  var echarts = require('echarts');
  import { mapState, mapMutations } from 'vuex'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {ElButton},
    data () {
      return {
        index:this.$route.params.index,
        activeName: 'first',
        deter:false,
        logs:'',
        logsdetail:'',
        count:false,
      }
    },
    methods:{
      handleClick(tab, event)
      {

        this.logsdetail=this.filecontent;
        if(this.showtask[this.index].state=='TASK_RUNNING') {
          if (tab.name == 'second') {
            console.log('begin get')
            this.deter = true;
            if (this.count = false) {
              this.getAll();
            }
          } else {
            this.deter = false;
            this.count = true;
          }
        }
      },
      getAll:()=>{
          console.log('getAll!')
          var that=this;

          setInterval(()=> {
            if(that.deter) {
              that.$store.dispatch('getTaskList', {
                that: that,
                id: that.tableData[index].name
              })
            }
          },5000)

      },
      handleDownload(index,row){
//          console.log(row.name)
//        console.log(this.showtask[this.index].name)
        window.location.href='http://192.168.6.66:8082/dgtrainer/v1/task/'+this.showtask[this.index].name+'/file?filename='+row.name;
      }

    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        console.log('to:',to,'from:',from)
      }
    },
    computed:{
      loss() {
        return this.$store.getters.loss
      },
      lr(){
          return this.$store.getters.lr
      },
      loss_belt(){
          return this.$store.getters.loss_belt
      },
      ...mapState({
        showtask:state=>state.data.tasklist,
        filecontent:state=>state.file.filecontent,
        filelist:state=>{
         let res= [];
         state.file.filelist.map(function (ele) {
           let temp={name:ele};
           res.push(temp);
         })
          return res;
        },
//        loss:state=> {
//          let result=[];
//            state.source.source.forEach(function (ele, index, self) {
//              for(let x in ele){
//                //console.log(ele[0]['loss'])
//                result.push({
//                  name:(x+'loss').toString(),
//                  value:[x.toString(),ele[x]['loss']]
//                })
//              }
//
//            })
//          return result;
//        }


      })
    },
    mounted(){
      var myChart = echarts.init(document.getElementById('main'));
      myChart.showLoading({
        text: '加载中...',
        effect: 'whirling'
      });
      setTimeout(function () {
          myChart.hideLoading();
      },5000)

      var option = {
        title: {
          text: 'running中的数据动态'
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'value',
          boundaryGap:['%30','79%'],
          splitLine: {
            show: true
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '10%'],
          splitLine: {
            show: true
          }
        },
        series: [{
          name: 'loss1',
          type: 'line',
          showSymbol: false,
          hoverAnimation: true,
          data: this.loss
        }, {
            name: 'lr',
            type: 'line',
            showSymbol: false,
            hoverAnimation: true,
            data: this.lr
          },{
            name: 'loss_belt',
            type: 'line',
            showSymbol: false,
            hoverAnimation: true,
            data: this.loss_belt
          }]
      };
      myChart.setOption(option,true);

      var that=this;
      setInterval(function () {
        //console.log(that.loss_belt[that.loss_belt.length-1])
        myChart.setOption({
          series: [{
            data: that.loss_belt
          }]
        });
      },8000)
    },
//    destoryed(){
//        this.$store.commit('changedeter',false)
//    }
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
    width: 100%;
    height: 25vh;
    overflow: scroll;
  }
</style>
