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
      <el-tab-pane label="show me the chart-loss" name="first">
        <div id="main1" style="height: 500px;width: 1000px;"></div>
      </el-tab-pane>
      <el-tab-pane label="show me the chart-lr" name="forth">
        <div id="main2" style="height: 500px;width: 1000px;"></div>
      </el-tab-pane>
      <el-tab-pane label="show me the chart-loss_belt" name="fifth">
        <div id="main3" style="height: 500px;width: 1000px;"></div>
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
        <el-input type="textarea" :rows="15" v-model="logsdetail" placeholder="no data" ></el-input>
      </el-tab-pane>
      <el-tab-pane label="show me the logs" name="third">
        <el-input type="textarea" :rows="60" v-model="logsshow" placeholder="no data" style="overflow: scroll"></el-input>
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
        logsshow:'',
        logsdetail:'',
        count:false,
      }
    },
    methods:{
      handleClick(tab, event)
      {

        this.logsdetail=this.filecontent;
        this.logsshow=this.logs;
        if(this.showtask[this.index].state=='TASK_RUNNING') {
          if (tab.name == 'third') {
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
      chartlen(){
        return this.$store.getters.chartlen
      },
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
        logs:state=>state.file.logs

      })
    },
    created(){
      let that = this;
      setInterval(function () {
        //console.log('thatsource',that.$store.state.source[that.chartlen-1],that.$store.state.source.length)
        for(let i in that.$store.state.source[that.chartlen-1]){
            var begin=Math.ceil(i/20+1);
        }
        //console.log(that,index);
        that.$store.dispatch('getChartSource', {
          that: that,
          id: that.showtask[that.index].name,
          begin:begin
        })

      }, 4000)
    },
    mounted(){
      var myChart1 = echarts.init(document.getElementById('main1'));
      var myChart2 = echarts.init(document.getElementById('main2'));
      var myChart3 = echarts.init(document.getElementById('main3'));
      myChart1.showLoading({
        text: '加载中...',
        effect: 'whirling'
      });
      myChart2.showLoading({
        text: '加载中...',
        effect: 'whirling'
      });
      myChart3.showLoading({
        text: '加载中...',
        effect: 'whirling'
      });
      setTimeout(function () {
        myChart1.hideLoading();
        myChart2.hideLoading();
        myChart3.hideLoading();
      },5000)

      var option1= {
        title: {
          text: 'running中的 loss'
        },
        tooltip: {
          trigger: 'axis',
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'value',
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
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 100
        }, {
          start: 0,
          end: 50,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#eee',
            shadowBlur: 5,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        series: [{
          name: 'loss',
          type: 'line',
          showSymbol: false,
          hoverAnimation: true,
          data: this.loss
        }]
      };
      var option2 = {
        title: {
          text: 'running中的 lr'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: true
          }
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'value',
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
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 100
        }, {
          start: 0,
          end: 50,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#eee',
            shadowBlur: 5,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        series: [{
          name: 'lr',
          type: 'line',
          showSymbol: false,
          hoverAnimation: true,
          data: this.lr
        }]
      };
      var option3 = {
        title: {
          text: 'running中的 loss_belt'
        },
        tooltip: {
          trigger: 'axis',
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'value',
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
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 100
        }, {
          start: 0,
          end: 50,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#eee',
            shadowBlur: 5,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        series: [{
          name: 'loss_belt',
          type: 'line',
          showSymbol: false,
          hoverAnimation: true,
          data: this.loss_belt
        }]
      };
      myChart1.setOption(option1,true);
      myChart2.setOption(option2,true);
      myChart3.setOption(option3,true);

      var that=this;
      setInterval(function () {
        //console.log(that.loss_belt[that.loss_belt.length-1])
        myChart1.setOption({
          series: [{
            data: that.loss
          }]
        });
        myChart2.setOption({
          series: [{
            data: that.lr
          }]
        });
        myChart3.setOption({
          series: [{
            data: that.loss_belt
          }]
        });
      },3000)
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
