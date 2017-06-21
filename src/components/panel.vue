<template>
  <div>



      <div v-for="item in this.showid" :key="item" >
        <div v-bind:id="item" style="width: 450px;height:450px;float: left"></div>
      </div>





  </div>
</template>


<script>
  var echarts = require('echarts');
  import { mapState} from 'vuex'
  export default {
    data () {
      return {
        showid:['main','sec','third','forth']
      }
    },
    computed:{
      sum() {
          //console.log('data!!!',this.$store.state.data)
        return this.$store.state.data.sum
      }
//        mapState({
//        tableData:state=>state.data.resourcelist,
//        sum:state=>state.data.sum
//      })
    },

    mounted() {

        var myChart = echarts.init(document.getElementById('main'));
        if (this.sum.length) {
          //指定图表的配置项和数据
          var option = {
            title: {
              text: 'resource  cpus',
              subtext: 'cpus',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              x: 'center',
              y: 'bottom',
              //data: ['resource cpu', 'offered cpu', 'unreserved cpu', 'used cpu']
            },
            toolbox: {
              show: true,
              feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {
                  show: true,
                  type: ['pie', 'funnel']
                },
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            calculable: true,
            series: [
              {

                name: '面积模式',
                type: 'pie',
                radius: [20, 80],
                center: ['55%', '50%'],
                data: [
                  {value: this.sum[0][2], name: 'unused cpu'},
                  {value: this.sum[0][3], name: 'used cpu'},
                ]
              }
            ]
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option,true);

        }



        var myChart2 = echarts.init(document.getElementById('sec'));
        if (this.sum.length) {
          //指定图表的配置项和数据
          var option2 = {
            title: {
              text: 'resource gpus',
              subtext: 'gpus',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              x: 'right',
              y: 'bottom',
              //data: ['resource gpu', 'offered gpu', 'unreserved gpu', 'used gpu']
            },
            toolbox: {
              show: true,
              feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {
                  show: true,
                  type: ['pie', 'funnel']
                },
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            calculable: true,
            series: [
              {
                name: '面积模式',
                type: 'pie',
                radius: [20, 80],
                center: ['55%', '50%'],
                data: [
                  {value: this.sum[1][2], name: 'unused gpu'},
                  {value: this.sum[1][3], name: 'used gpu'},
                ]
              }
            ]
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart2.setOption(option2,true);

        }

      var myChart3 = echarts.init(document.getElementById('third'));
      if (this.sum.length) {
        //指定图表的配置项和数据
        var option3 = {
          title: {
            text: 'resource mem',
            subtext: 'mem',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            x: 'center',
            y: 'bottom',
            //data: ['resource mem', 'offered mem', 'unreserved mem', 'used mem']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {
                show: true,
                type: ['pie', 'funnel']
              },
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          series: [
            {
              name: '面积模式',
              type: 'pie',
              radius: [20, 80],
              center: ['55%', '50%'],
              data: [
                {value: this.sum[2][2], name: 'unused mem'},
//                {value: this.sum[2][1], name: 'offered mem'},
//                {value: this.sum[2][2], name: 'unreserved mem'},
                {value: this.sum[2][3], name: 'used mem'},
              ]
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart3.setOption(option3,true);

      }


      var myChart4 = echarts.init(document.getElementById('forth'));
      if (this.sum.length) {
        //指定图表的配置项和数据
        var option4 = {
          title: {
            text: 'resource disk',
            subtext: 'disk',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            x: 'center',
            y: 'bottom',
            //data: ['resource disk', 'offered disk', 'unreserved disk', 'used disk']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {
                show: true,
                type: ['pie', 'funnel']
              },
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          series: [
            {
              name: '面积模式',
              type: 'pie',
              radius: [20, 80],
              center: ['55%', '50%'],
              data: [
                {value: this.sum[3][2], name: 'unused disk'},
                {value: this.sum[3][3], name: 'used disk'},
              ]
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart4.setOption(option4,true);

      }
      }



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
