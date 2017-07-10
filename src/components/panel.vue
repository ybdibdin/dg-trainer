<template>
  <div>
      <div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">

        <el-table-column
          fixed
          prop="hostname"
          label="hostname"
          width="180">
        </el-table-column>

        <el-table-column
          label="resource">
          <el-table-column
            prop="resource.cpus"
            label="cpus"
          >
          </el-table-column>
          <el-table-column
            prop="resource.gpus"
            label="gpus"
          >
          </el-table-column>
          <el-table-column
            prop="resource.mem"
            label="mem"
          >
          </el-table-column>
          <el-table-column
            prop="resource.disk"
            label="disk"
          >
          </el-table-column>
        </el-table-column>


        <el-table-column
          label="used_resource">
          <el-table-column
            prop="usedR.cpus"
            label="cpus"
          >
          </el-table-column>
          <el-table-column
            prop="usedR.gpus"
            label="gpus"
          >
          </el-table-column>
          <el-table-column
            prop="usedR.mem"
            label="mem"
          >
          </el-table-column>
          <el-table-column
            prop="usedR.disk"
            label="disk"
          >
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
      <div>
        <div id="main" style="width: 650px;height:500px;float: left;margin-left: 20%"></div>
      </div>
  </div>
</template>


<script>
  var echarts = require('echarts');
  import { mapState} from 'vuex'
  export default {
    data () {
      return {
        unusedcpus:20,
        usedcpus:20,
        deter1:false
      }
    },
    computed:{
        resourcelist(){
            return this.$store.getters.resourcestate;
        },
//      sum() {
//          //console.log('data!!!',this.$store.state.data)
//        return this.$store.state.data.sum
//      },
      ...mapState({
        tableData:state=>state.data.resourcelist,
//        sum:state=>state.data.sum
      })
    },
    watch:{
      resourcelist() {
        var myChart = echarts.init(document.getElementById('main'));
          //指定图表的配置项和数据
//          var option = {
//            color:['#2f4554','#c23531', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
//            title: {
//              text: 'resource  cpus',
//              subtext: 'cpus',
//              x: 'center'
//            },
//            tooltip: {
//              trigger: 'item',
//              formatter: "{a} <br/>{b} : {c} ({d}%)"
//            },
//            legend: {
//              x: 'center',
//              y: 'bottom',
//              //data: ['resource cpu', 'offered cpu', 'unreserved cpu', 'used cpu']
//            },
//            toolbox: {
//              show: true,
//            },
//            calculable: true,
//            series: [
//              {
//
//                name: '面积模式',
//                type: 'pie',
//                radius: [10, 80],
//                center: ['55%', '50%'],
//                data: [
//                  {value:this.resourcelist[0] , name: 'unused cpu'},
//                  {value:this.resourcelist[4],  name: 'used cpu'},
//                ]
//              }
//            ]
//          };
          // 使用刚指定的配置项和数据显示图表。
        var dataStyle = {
          normal: {
            label: {show: true,
              position: "left"},
            labelLine: {show:true},
            shadowBlur: 80,
            shadowColor: 'rgba(40, 40, 40, 0.5)',
          }
        };
        var placeHolderStyle = {
          normal : {
            color: 'rgba(0,0,0,0)',
            label: {show:false},
            labelLine: {show:false}
          },
          emphasis : {
            color: 'rgba(0,0,0,0)'
          }
        };
        var option = {
          color: ['#6d4f8d','#cd5e7e', '#e38980','#f7db88'],
          tooltip : {
            show: true,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            itemGap:2,
            top: '94%',
            data:['available cpus resource','available gpus resource','available mem resource','available disk resource'],
            position:'left'
          },
          toolbox: {
            show : true,
          },
          series : [
            {
              name:'CPUS',
              type:'pie',
              clockWise:false,
              radius : [180,200],
              itemStyle : dataStyle,
              hoverAnimation: false,
              data:[
                {
                  value:this.resourcelist[0]-this.resourcelist[4],
                  name:'available cpus resource'
                },
                {
                  value:this.resourcelist[4],
                  name:'invisible',
                  itemStyle : placeHolderStyle
                }

              ]
            },
            {
              name:'GPUS',
              type:'pie',
              clockWise:false,
              radius : [160, 180],
              itemStyle : dataStyle,
              hoverAnimation: false,

              data:[
                {
                  value:this.resourcelist[1]-this.resourcelist[5],
                  name:'available gpus resource'
                },
                {
                  value:this.resourcelist[6],
                  name:'invisible',
                  itemStyle : placeHolderStyle
                }
              ]
            },
            {
              name:'MEM',
              type:'pie',
              clockWise:false,
              hoverAnimation: false,
              radius : [140, 160],
              itemStyle : dataStyle,

              data:[
                {
                  value:this.resourcelist[2]-this.resourcelist[6],
                  name:'available mem resource'
                },
                {
                  value:this.resourcelist[6],
                  name:'invisible',
                  itemStyle : placeHolderStyle
                }
              ]
            },
            {
              name:'DISK',
              type:'pie',
              clockWise:false,
              hoverAnimation: false,
              radius : [120, 140],
              itemStyle : dataStyle,

              data:[
                {
                  value:this.resourcelist[3]-this.resourcelist[7],
                  name:'available disk resource'
                },
                {
                  value:this.resourcelist[7],
                  name:'invisible',
                  itemStyle : placeHolderStyle
                }
              ]
            },{
              name: '白',
              type: 'pie',
              clockWise: true,
              hoverAnimation: false,
              radius: [100, 100],
              label: {
                normal: {
                  position: 'center'
                }
              },
              data: [{
                value: 1,
                label: {
                  normal: {
                    formatter: '资源使用情况',
                    textStyle: {
                      color: '#666666',
                      fontSize: 26
                    }
                  }
                }
              }]
            }


          ]
        };
          myChart.setOption(option,true);

//        var myChart2 = echarts.init(document.getElementById('sec'));
//
//          //指定图表的配置项和数据
//          var option2 = {
//            color:['#2f4554','#c23531', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
//            title: {
//              text: 'resource gpus',
//              subtext: 'gpus',
//              x: 'center'
//            },
//            tooltip: {
//              trigger: 'item',
//              formatter: "{a} <br/>{b} : {c} ({d}%)"
//            },
//            legend: {
//              x: 'right',
//              y: 'bottom',
//              //data: ['resource gpu', 'offered gpu', 'unreserved gpu', 'used gpu']
//            },
//            toolbox: {
//              show: true,
//            },
//            calculable: true,
//            series: [
//              {
//                name: '面积模式',
//                type: 'pie',
//                radius: [10, 80],
//                center: ['55%', '50%'],
//                data: [
//                  {value: this.resourcelist[1], name: 'unused gpu'},
//                  {value: this.resourcelist[5], name: 'used gpu'},
//                ]
//              }
//            ]
//          };
//
//          // 使用刚指定的配置项和数据显示图表。
//          myChart2.setOption(option2,true);
//
//
//        var myChart3 = echarts.init(document.getElementById('third'));
//
//          //指定图表的配置项和数据
//          var option3 = {
//            color:['#2f4554','#c23531', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
//            title: {
//              text: 'resource mem',
//              subtext: 'mem',
//              x: 'center'
//            },
//            tooltip: {
//              trigger: 'item',
//              formatter: "{a} <br/>{b} : {c} ({d}%)"
//            },
//            legend: {
//              x: 'center',
//              y: 'bottom',
//              //data: ['resource mem', 'offered mem', 'unreserved mem', 'used mem']
//            },
//            toolbox: {
//              show: true,
//            },
//            calculable: true,
//            series: [
//              {
//                name: '面积模式',
//                type: 'pie',
//                radius: [10, 80],
//                center: ['55%', '50%'],
//                data: [
//                  {value: this.resourcelist[2], name: 'unused mem'},
//                  {value: this.resourcelist[6], name: 'used mem'},
//                ]
//              }
//            ]
//          };
//
//          // 使用刚指定的配置项和数据显示图表。
//          myChart3.setOption(option3,true);
//
//
//        var myChart4 = echarts.init(document.getElementById('forth'));
//
//          //指定图表的配置项和数据
//          var option4 = {
//            color:['#2f4554','#c23531', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
//            title: {
//              text: 'resource disk',
//              subtext: 'disk',
//              x: 'center'
//            },
//            tooltip: {
//              trigger: 'item',
//              formatter: "{a} <br/>{b} : {c} ({d}%)"
//            },
//            legend: {
//              x: 'center',
//              y: 'bottom',
//              //data: ['resource disk', 'offered disk', 'unreserved disk', 'used disk']
//            },
//            toolbox: {
//              show: true,
//            },
//            calculable: true,
//            series: [
//              {
//                name: '面积模式',
//                type: 'pie',
//                radius: [10, 80],
//                center: ['55%', '50%'],
//                data: [
//                  {value: this.resourcelist[3], name: 'unused disk'},
//                  {value: this.resourcelist[7], name: 'used disk'},
//                ]
//              }
//            ]
//          };
//
//          // 使用刚指定的配置项和数据显示图表。
//          myChart4.setOption(option4,true);

        }

    },
    methods:{

    },
    created(){
      var that=this;
      var getresource=setInterval(function () {
        if(that.deter1 == true){
          clearInterval(that.getresource);
        }else{
          that.$store.dispatch('getResource', that);
        }
      },5000)
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      this.deter1=true;
      next();
    }
//    created() {
//      var myChart = echarts.init(document.getElementById('main'));
//      if (this.sum.length) {
//        //指定图表的配置项和数据
//        var option = {
//          color:['#2f4554','#c23531', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
//          title: {
//            text: 'resource  cpus',
//            subtext: 'cpus',
//            x: 'center'
//          },
//          tooltip: {
//            trigger: 'item',
//            formatter: "{a} <br/>{b} : {c} ({d}%)"
//          },
//          legend: {
//            x: 'center',
//            y: 'bottom',
//            //data: ['resource cpu', 'offered cpu', 'unreserved cpu', 'used cpu']
//          },
//          toolbox: {
//            show: true,
//          },
//          calculable: true,
//          series: [
//            {
//
//              name: '面积模式',
//              type: 'pie',
//              radius: [20, 80],
//              center: ['55%', '50%'],
//              data: [
//                {value:this.resource[0] , name: 'resource cpu'},
//                {value:this.resource[4],  name: 'unused cpu'},
//              ]
//            }
//          ]
//        };
//        // 使用刚指定的配置项和数据显示图表。
//        myChart.setOption(option,true);
//
//      }
//
//
//      var myChart2 = echarts.init(document.getElementById('sec'));
//      if (this.sum.length) {
//          //指定图表的配置项和数据
//          var option2 = {
//            color:['#2f4554','#c23531', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
//            title: {
//              text: 'resource gpus',
//              subtext: 'gpus',
//              x: 'center'
//            },
//            tooltip: {
//              trigger: 'item',
//              formatter: "{a} <br/>{b} : {c} ({d}%)"
//            },
//            legend: {
//              x: 'right',
//              y: 'bottom',
//              //data: ['resource gpu', 'offered gpu', 'unreserved gpu', 'used gpu']
//            },
//            toolbox: {
//              show: true,
//            },
//            calculable: true,
//            series: [
//              {
//                name: '面积模式',
//                type: 'pie',
//                radius: [20, 80],
//                center: ['55%', '50%'],
//                data: [
//                  {value: this.resource[1], name: 'unused gpu'},
//                  {value: this.resource[5], name: 'used gpu'},
//                ]
//              }
//            ]
//          };
//
//          // 使用刚指定的配置项和数据显示图表。
//          myChart2.setOption(option2,true);
//
//        }
//
//      var myChart3 = echarts.init(document.getElementById('third'));
//      if (this.sum.length) {
//        //指定图表的配置项和数据
//        var option3 = {
//          color:['#2f4554','#c23531', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
//          title: {
//            text: 'resource mem',
//            subtext: 'mem',
//            x: 'center'
//          },
//          tooltip: {
//            trigger: 'item',
//            formatter: "{a} <br/>{b} : {c} ({d}%)"
//          },
//          legend: {
//            x: 'center',
//            y: 'bottom',
//            //data: ['resource mem', 'offered mem', 'unreserved mem', 'used mem']
//          },
//          toolbox: {
//            show: true,
//          },
//          calculable: true,
//          series: [
//            {
//              name: '面积模式',
//              type: 'pie',
//              radius: [20, 80],
//              center: ['55%', '50%'],
//              data: [
//                {value: this.sum[2][2], name: 'unused mem'},
////                {value: this.sum[2][1], name: 'offered mem'},
////                {value: this.sum[2][2], name: 'unreserved mem'},
//                {value: this.sum[2][3], name: 'used mem'},
//              ]
//            }
//          ]
//        };
//
//        // 使用刚指定的配置项和数据显示图表。
//        myChart3.setOption(option3,true);
//
//      }
//
//
//      var myChart4 = echarts.init(document.getElementById('forth'));
//      if (this.sum.length) {
//        //指定图表的配置项和数据
//        var option4 = {
//          color:['#2f4554','#c23531', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
//          title: {
//            text: 'resource disk',
//            subtext: 'disk',
//            x: 'center'
//          },
//          tooltip: {
//            trigger: 'item',
//            formatter: "{a} <br/>{b} : {c} ({d}%)"
//          },
//          legend: {
//            x: 'center',
//            y: 'bottom',
//            //data: ['resource disk', 'offered disk', 'unreserved disk', 'used disk']
//          },
//          toolbox: {
//            show: true,
//          },
//          calculable: true,
//          series: [
//            {
//              name: '面积模式',
//              type: 'pie',
//              radius: [20, 80],
//              center: ['55%', '50%'],
//              data: [
//                {value: this.sum[3][2], name: 'unused disk'},
//                {value: this.sum[3][3], name: 'used disk'},
//              ]
//            }
//          ]
//        };
//
//        // 使用刚指定的配置项和数据显示图表。
//        myChart4.setOption(option4,true);
//
//      }
//      }



  }


</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
