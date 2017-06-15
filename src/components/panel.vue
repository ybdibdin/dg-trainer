<template>
  <div>
    <h1>UR Task is clean</h1>
  </div>
</template>


<script>
  export default {
    data () {
      return {

      }
    },
    methods:{

    },
    created: function () {
      //get resource
      this.$http.get('http://192.168.6.66:8081/dgtrainer/v1/resources').then(response => {
        // success callback
        console.log(response);
        //console.log(JSON.stringify(response.data.slaves[0].resources))
        // console.log(JSON.parse(response.request.response).slaves.length);
        for (var i = 0; i < response.data.slaves.length; i++) {
          //console.log(response.data.slaves[i].used_resources.gpus)
          var objtemp = {
            id: response.data.slaves[i].id,
            hostname: response.data.slaves[i].hostname,
            resource: JSON.stringify(response.data.slaves[i].resources),
            offeredR: response.data.slaves[i].offered_resources,
            unreservedR: response.data.slaves[i].unreserved_resources,
            usedR: response.data.slaves[i].used_resources
          }

          this.tableData.push(objtemp);

        }


        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['used resource1', 'unreserved resource1', 'offered resource1', 'used resource2', 'unreserved resource2', 'offered resource2', 'used resource3', 'unreserved resource3', 'offered resource3'],
            top: 10,
            align: 'left'
          },
          grid: {
            left: '10%',
            //right: '4%',
            bottom: '3%',
            //top:'2%',
            containLabel: true
          },
          xAxis: [
            {
              data: ['Cpus', 'Gpus', 'Mem', 'Disk']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [

            {
              name: 'used resource1',
              type: 'bar',
              stack: '1',
              data: this.usedR[0]
            },
            {
              name: 'unreserved resource1',
              type: 'bar',
              stack: '1',
              data: this.unresR[0]
            },
            {
              name: 'offered resource1',
              type: 'bar',
              stack: '1',
              barWidth: 15,
              data: this.offeredR[0]
            },
//            {
//              name:'Disk1',
//              type:'bar',
//              stack:'1',
//              barWidth : 15,
//              data:this.resourceR[0]
//            },
            {
              name: 'used resource2',
              type: 'bar',
              barWidth: 15,
              stack: '2',
              data: this.usedR[1]
            },
            {
              name: 'unreserved resource2',
              type: 'bar',
              stack: '2',
              data: this.unresR[1]
            },
            {
              name: 'offered resource2',
              type: 'bar',
              stack: '2',
              data: this.offeredR[1]
            },
//            {
//              name:'Disk2',
//              type:'bar',
//              stack: '2',
//              data:this.resourceR[1]
//            }
            {
              name: 'used resource3',
              type: 'bar',
              stack: '3',
              data: this.usedR[2]
            },
            {
              name: 'unreserved resource3',
              type: 'bar',
              stack: '3',
              data: this.unresR[2]
            },
            {
              name: 'offered resource3',
              type: 'bar',
              stack: '3',
              barWidth: 15,
              data: this.offeredR[2]
            },
          ]
        })
        //console.log('usr:'+this.cpusR[0])
      }, response => {
        // error callback
      })
    }
  }


</script>

<style scoped>

</style>
