<template>
  <div>
    <div class="box-card" >
      <div class="text item">
        <el-row :gutter="20">
          <el-col><el-tag  >task-id: {{showtask[this.index].name}}</el-tag></el-col>
          <el-col><el-tag  >task-state: {{showtask[this.index].state }}</el-tag></el-col>
          <el-col><el-tag  >state-message: {{showtask[this.index].state_message||'no state message to show' }}</el-tag></el-col>
          <el-col><el-tag  >dependency_uris: {{showtask[this.index].dependency_uris||'dependency_uris is null' }}</el-tag></el-col>
          <el-col><el-tag  >docker_image: {{showtask[this.index].docker_image||'docker_image is null' }}</el-tag></el-col>
        </el-row>
        <el-tag>instances: {{showtask[this.index].instances }}</el-tag>
        <el-tag>cpus: {{showtask[this.index].resources.cpus}}</el-tag>
        <el-tag>gpus: {{showtask[this.index].resources.gpus }}</el-tag>
        <el-tag>mem: {{showtask[this.index].resources.mem }}</el-tag>
        <el-tag>disk: {{showtask[this.index].resources.disk }}</el-tag>
        <el-tag>cmd: {{showtask[this.index].cmd||'cmd is null' }}</el-tag>
        <el-tag>waiting-time: {{showtask[this.index].WaitingTime }}</el-tag>
      </div>
    </div>
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
      </el-tab-pane>
      <el-tab-pane label="show me the logs" name="third">
        <textarea readonly  v-model="logsshow" placeholder="no data" style="overflow: scroll;width: 100%;height: 90vh" id="logs"></textarea>
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
        deter3:false
      }
    },
    methods:{
      handleClick(tab, event)
      {

        this.logsdetail=this.filecontent;
        if(tab.name== 'third'){
          this.logsshow=this.logs;
        }
        if(this.showtask[this.index].state=='TASK_RUNNING') {
          if (tab.name == 'third'||tab.name=='second') {
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
          var that=this;

          setInterval(()=> {
            if(that.deter) {
              that.$store.dispatch('getTaskDetail', {
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
      },
      logsshow(){
        var textarea = document.getElementById('logs');
        if(textarea.selectionStart == textarea.selectionEnd) {
          textarea.scrollTop = textarea.scrollHeight;
        }
        console.log(textarea.scrollHeight)
        textarea.scrollTop = 1000;
      }
//      loss(){
//        var myChart1 = echarts.init(document.getElementById('main1'));
//
//        var myChart3 = echarts.init(document.getElementById('main3'));
//        myChart1.showLoading({
//          text: '加载中...',
//          effect: 'whirling'
//        });
//
//        myChart3.showLoading({
//          text: '加载中...',
//          effect: 'whirling'
//        });
//        setTimeout(function () {
//          myChart1.hideLoading();
//
//          myChart3.hideLoading();
//        },5000)
//
//        var option1= {
//          title: {
//            text: 'running中的 loss'
//          },
//          tooltip: {
//            trigger: 'axis',
//          },
//          toolbox: {
//            show: true,
//            feature: {
//              dataView: {readOnly: false},
//              restore: {},
//              saveAsImage: {}
//            }
//          },
//          xAxis: {
//            type: 'value',
//            splitLine: {
//              show: true
//            },
//            name:'timeline',
//            //scale:true
//          },
//          yAxis: {
//            type: 'value',
//            boundaryGap: [0, '10%'],
//            splitLine: {
//              show: true
//            }
//          },
//          dataZoom: [{
//            type: 'inside',
//            start: 0,
//            end: 100
//          }, {
//            start: 0,
//            end: 50,
//            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
//            handleSize: '80%',
//            handleStyle: {
//              color: '#eee',
//              shadowBlur: 5,
//              shadowColor: 'rgba(0, 0, 0, 0.6)',
//              shadowOffsetX: 2,
//              shadowOffsetY: 2
//            }
//          }],
//          series: [{
//            name: 'loss',
//            type: 'line',
//            showSymbol: false,
//            hoverAnimation: true,
//            data: this.loss
//          }]
//        };
//
//        var option3 = {
//          title: {
//            text: 'running中的 loss_belt'
//          },
//          tooltip: {
//            trigger: 'axis',
//          },
//          toolbox: {
//            show: true,
//            feature: {
//              dataView: {readOnly: false},
//              restore: {},
//              saveAsImage: {}
//            }
//          },
//          xAxis: {
//            type: 'value',
//            splitLine: {
//              show: true
//            },
//            name:'timeline',
//          },
//          yAxis: {
//            type: 'value',
//            boundaryGap: [0, '10%'],
//            splitLine: {
//              show: true
//            }
//          },
//          dataZoom: [{
//            type: 'inside',
//            start: 0,
//            end: 100
//          }, {
//            start: 0,
//            end: 50,
//            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
//            handleSize: '80%',
//            handleStyle: {
//              color: '#eee',
//              shadowBlur: 5,
//              shadowColor: 'rgba(0, 0, 0, 0.6)',
//              shadowOffsetX: 2,
//              shadowOffsetY: 2
//            }
//          }],
//          series: [{
//            name: 'loss_belt',
//            type: 'line',
//            showSymbol: false,
//            hoverAnimation: true,
//            data: this.loss_belt
//          }]
//        };
//        myChart1.setOption(option1,true);
//
//        myChart3.setOption(option3,true);
//
//      },
//      lr(){
//        var myChart2 = echarts.init(document.getElementById('main2'));
//        myChart2.showLoading({
//          text: '加载中...',
//          effect: 'whirling'
//        });
//        myChart2.hideLoading();
//        var option2 = {
//          title: {
//            text: 'running中的 lr'
//          },
//          tooltip: {
//            trigger: 'axis',
//            axisPointer: {
//              animation: true
//            }
//          },
//          toolbox: {
//            show: true,
//            feature: {
//              dataView: {readOnly: false},
//              restore: {},
//              saveAsImage: {}
//            }
//          },
//          xAxis: {
//            type: 'value',
//            splitLine: {
//              show: true
//            },
//            name:'timeline'
//          },
//          yAxis: {
//            type: 'value',
//            boundaryGap: [0, '10%'],
//            splitLine: {
//              show: true
//            }
//          },
//          dataZoom: [{
//            type: 'inside',
//            start: 0,
//            end: 100
//          }, {
//            start: 0,
//            end: 50,
//            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
//            handleSize: '80%',
//            handleStyle: {
//              color: '#eee',
//              shadowBlur: 5,
//              shadowColor: 'rgba(0, 0, 0, 0.6)',
//              shadowOffsetX: 2,
//              shadowOffsetY: 2
//            }
//          }],
//          series: [{
//            name: 'lr',
//            type: 'line',
//            showSymbol: false,
//            hoverAnimation: true,
//            data: this.lr
//          }]
//        };
//        myChart2.setOption(option2,true);
//      },
//      loss_belt(){
//
//      }
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
        logs:state=>state.file.logs

      })
    },
    created(){
      let that = this;
      var getchartsource=setInterval(function () {
          if(that.deter3==false) {
            //console.log('thatsource',that.$store.state.source[that.chartlen-1],that.$store.state.source.length)
            for (let i in that.$store.state.source[that.chartlen - 1]) {
                console.log('i',i)
              var begin = Math.ceil(i / 20 + 1);
            }
            //console.log(that,index);
            that.$store.dispatch('getChartSource', {
              that: that,
              id: that.showtask[that.index].name,
              begin: begin
            })
          }else{
              clearInterval(that.getchartsource);
          }
      }, 4000)
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      this.deter3=true;
      next();
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
          },
          name:'timeline',
          //scale:true
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
          },
          name:'timeline'
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
          },
          name:'timeline',
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
