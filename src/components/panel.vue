<template>
  <div>

      <el-carousel :interval="4000" type="card" height="80vh">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    <div id="main" style="width: 600px;height:400px;"></div>

  </div>
</template>


<script>
  var echarts = require('echarts');
  import { mapState, mapMutations } from 'vuex'
  export default {
    data () {
      return {

      }
    },
    methods:{
     init() {
    var myChart = echarts.init(document.getElementById('main'));
    console.log(this.$store.state.data)
    // 指定图表的配置项和数据
    var option = {
      title : {
        text: 'resource',
        subtext: 'cpus',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        x : 'center',
        y : 'bottom',
        data:['resource cpu','offered cpu','unreserved cpu','used cpu']
      },
      toolbox: {
        show : true,
        feature : {
          mark : {show: true},
          dataView : {show: true, readOnly: false},
          magicType : {
            show: true,
            type: ['pie', 'funnel']
          },
          restore : {show: true},
          saveAsImage : {show: true}
        }
      },
      calculable : true,
      series : [
        {
          name:'面积模式',
          type:'pie',
          radius : [30, 110],
          center : ['75%', '50%'],
          data:[
            {value:this.sum[0][0], name:'resource cpu'},
            {value:34, name:'offered cpu'},
            {value:39, name:'unreserved cpu'},
            {value:12, name:'used cpu'},
          ]
        }
      ]
    };


       // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
    },
    computed:{
      ...mapState({
        tableData:state=>state.data.resourcelist,
        sum:state=>state.data.sum
      }),

    },
    mounted(){
      this.init()
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
