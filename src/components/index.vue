<template>
  <div>

    <div class="main-show">
      <div id="charts">
        <div id="main"  :style="{width:'700px',height:'450px',padding:'0 0 0 120px'}"></div>
      </div>
        <div class="resource" >
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column type="expand">
              <template scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="resource">
                    <span>{{ props.row.resource }}</span>
                  </el-form-item>
                  <el-form-item label="hostname">
                    <span>{{ props.row.hostname }}</span>
                  </el-form-item>
                  <el-form-item label="Id">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="offered-resource">
                    <span>{{ props.row.offeredR }}</span>
                  </el-form-item>
                  <el-form-item label="unreserved-resources">
                    <span>{{ props.row.unreservedR }}</span>
                  </el-form-item>
                  <el-form-item label="used-resources">
                    <span>{{ props.row.usedR }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              label="Resources-Id"
              prop="id">
            </el-table-column>
            <el-table-column
              label="hostname"
              prop="hostname">
            </el-table-column>
            <el-table-column
              label="resource"
              prop="resource">
            </el-table-column>
          </el-table>
        </div>
        <div class="list">
          <el-table
          :data="tableData1"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column type="expand">
            <template scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="task_id:">
                  <span>{{ props.row.name }}</span>
                </el-form-item><br />
                <el-form-item label="cmd:">
                  <span>{{ props.row.cmd }}</span>
                </el-form-item><br />
                <el-form-item label="WaitingTime:">
                  <span>{{ props.row.WaitingTime }}</span>
                </el-form-item><br />
                <el-form-item label="dependency_uris:">
                  <span>{{ props.row.dependency_uris }}</span>
                </el-form-item><br />
                <el-form-item label="docker_image:">
                  <span>{{ props.row.docker_image }}</span>
                </el-form-item><br />
                <el-form-item label="instances:">
                  <span>{{ props.row.instances }}</span>
                </el-form-item><br />
                <el-form-item label="resources:">
                  <span>{{ props.row.resources }}</span>
                </el-form-item><br />
                <el-form-item label="state:">
                  <span >{{ props.row.state }}</span>
                </el-form-item><br />
                <el-form-item label="state_message:">
                  <span>{{ props.row.state_message }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="task_iD"
            prop="name"
            width="380px">
          </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="tag" label="标签" width="100" :filters="[{ text: 'TASK_KILLED', value: 'TASK_KILLED' }, { text: 'TASK_FINISHED', value: 'TASK_FINISHED' },{text:'TASK_RUNNING',value:'TASK_RUNNING'},{text:'TASK_FAILED',value:'TASK_FAILED'}]"
                             :filter-method="filterTag" filter-placement="bottom-end">
              <template scope="scope">
                <el-tag :type="scope.row.tagclass" close-transition>{{scope.row.tag}}</el-tag>
              </template>
            </el-table-column>
          </el-table>

        </div>
    </div>
    </div>




</template>

<script>
var echarts = require('echarts');

  export default {
    data () {
      return {
        tableData: [],
        tableData1: [],
        usedR:[],
        unresR:[],
        offeredR:[]
        //resourceR:[]
      }
    },
    created: function () {
        //get resource
      this.$http.get('http://192.168.6.66:8081/dgtrainer/v1/resources').then(response => {
        // success callback
        console.log(response);
        //console.log(JSON.stringify(response.data.slaves[0].resources))
        // console.log(JSON.parse(response.request.response).slaves.length);
        for(var i=0;i<response.data.slaves.length;i++){
            //console.log(response.data.slaves[i].used_resources.gpus)
            var objtemp={
                id:response.data.slaves[i].id,
                hostname:response.data.slaves[i].hostname,
                resource:JSON.stringify(response.data.slaves[i].resources),
                offeredR:response.data.slaves[i].offered_resources,
                unreservedR:response.data.slaves[i].unreserved_resources,
                usedR:response.data.slaves[i].used_resources
            }
            var tempusedR=response.data.slaves[i].used_resources;
            var tempunresR=response.data.slaves[i].unreserved_resources;
            var tempofferedR=response.data.slaves[i].offered_resources;
            var tempresource=response.data.slaves[i].resources;
            //console.log(tempofferedR);
           this.usedR.push([tempusedR.cpus/tempresource.cpus,tempusedR.gpus/tempresource.gpus,tempusedR.mem/tempresource.mem,tempusedR.disk/tempresource.disk]);
           this.unresR.push([tempunresR.cpus/tempresource.cpus,tempunresR.gpus/tempresource.gpus,tempunresR.mem/tempresource.mem,tempunresR.disk/tempresource.disk]);
           this.offeredR.push([tempofferedR.cpus/tempresource.cpus,tempofferedR.gpus/tempresource.gpus,tempofferedR.mem/tempresource.mem,tempofferedR.disk/tempresource.disk]);
           //this.resourceR.push([tempusedR.disk/tempresource.disk,tempunresR.disk/tempresource.disk,tempofferedR.disk/tempresource.disk,1]);

            this.tableData.push(objtemp);

        }


        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption({
//          title:{
//              text:'resource state',
//              padding:[0,0,0,0]
//          },
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data:['used resource1','unreserved resource1','offered resource1','used resource2','unreserved resource2','offered resource2','used resource3','unreserved resource3','offered resource3'],
            top:10,
            align:'left'
          },
          grid: {
            left: '10%',
            //right: '4%',
            bottom: '3%',
            //top:'2%',
            containLabel: true
          },
          xAxis : [
            {
              data : ['Cpus','Gpus','Mem','Disk']
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [

            {
              name:'used resource1',
              type:'bar',
              stack: '1',
              data:this.usedR[0]
            },
            {
              name:'unreserved resource1',
              type:'bar',
              stack: '1',
              data:this.unresR[0]
            },
            {
              name:'offered resource1',
              type:'bar',
              stack: '1',
              barWidth : 15,
              data:this.offeredR[0]
            },
//            {
//              name:'Disk1',
//              type:'bar',
//              stack:'1',
//              barWidth : 15,
//              data:this.resourceR[0]
//            },
            {
              name:'used resource2',
              type:'bar',
              barWidth : 15,
              stack: '2',
              data:this.usedR[1]
            },
            {
              name:'unreserved resource2',
              type:'bar',
              stack: '2',
              data:this.unresR[1]
            },
            {
              name:'offered resource2',
              type:'bar',
              stack: '2',
              data:this.offeredR[1]
            },
//            {
//              name:'Disk2',
//              type:'bar',
//              stack: '2',
//              data:this.resourceR[1]
//            }
            {
              name:'used resource3',
              type:'bar',
              stack: '3',
              data:this.usedR[2]
            },
            {
              name:'unreserved resource3',
              type:'bar',
              stack: '3',
              data:this.unresR[2]
            },
            {
              name:'offered resource3',
              type:'bar',
              stack: '3',
              barWidth : 15,
              data:this.offeredR[2]
            },
          ]
        })
        //console.log('usr:'+this.cpusR[0])
      }, response => {
        // error callback
      })
      //get tasklist
      this.$http.get('http://192.168.6.66:8081/dgtrainer/v1/tasks').then(response => {
         //console.log('table response',response)
          for(var x in response.data){
              if(response.data[x]){
                  //console.log(response.data[x].state_message);
                  var temp={
                      name:response.data[x].name,
                      cmd:response.data[x].cmd,
                      WaitingTime:response.data[x].WaitingTime,
                      dependency_uris:JSON.stringify(response.data[x].dependency_uris),
                      docker_image:response.data[x].docker_image,
                      instances:response.data[x].instances,
                      resources:JSON.stringify(response.data[x].resources),
                      state:response.data[x].state,
                      state_message:response.data[x].state_message,
                      tag:response.data[x].state
                  }
                  if(temp.state=='TASK_FINISHED'){
                      temp.tagclass = 'success'
                  }else if(temp.state == 'TASK_FAILED'){
                      temp.tagclass ='danger'
                  }else if(temp.state=='TASK_RUNNING'){
                      temp.tagclass='info'
                  }else if(temp.state=='TASK_KILLED'){
                      temp.tagclass='warning'
                  }
                this.tableData1.push(temp);
              }
              //console.log('tabledata',this.tableData1);
            //console.log('statemes:'+this.tableData1[0].state_message);
            //sort by state
              this.tableData1.sort(function (x,y) {
                  var arr=[x,y];
                  arr.forEach(function (element,index,self) {
                    if(element.state =='TASK_FINISHED'){
                      self[index]=10;
                    }else if(element.state == 'TASK_FAILED'){
                      self[index]=-10;
                    }else if(element.state == 'TASK_RUNNING'){
                      self[index]=100;
                    }else if(element.state == 'TASK_KILLED'){
                      self[index]=0;
                    }
                  })

                  return arr[1]-arr[0];

              })
        }

        }, response => {
          // error callback
        })


    },
    watch: {
      activeName: function (val, oldval) {
        console.log(val, oldval);
      }
    },
      methods: {
        tableRowClassName(row, index) {
          if (index === 1) {
            return 'info-row';
          } else if (index === 3) {
            return 'positive-row';
          }
          return 'chen';
        },
        filterTag(value, row) {
          return row.tag === value;
        },
        handleDelete:function (index, row) {
            console.log('tabledata',this.tableData1);
          this.$http({
            url:'http://192.168.6.66:8081/dgtrainer/v1/task/'+this.tableData1[index].name,
            method:'delete',
            headers: {
              'Content-Type': 'application/json'
            }
//                'Content-Type': 'application/json ;charset=utf-8',
//                'Access-Control-Request-Method':'DELETE'
//            }
          }).then((res)=>{
            this.tableData1.splice(index, 1);
            //console.log(res.request.responseText.split("\"")[3])
            //console.log(typeof res.request.responseText.split("\""));
//          this.text1=res.request.responseText;
//          this.taskid=res.request.responseText.split("\"")[3];
            this.$notify({
              title: '成功',
              message: '删除任务成功',
              type: 'info'
            });
         })

       }
    }
  }


//      second:function () {
//        this.$http.get('http://192.168.6.66:8081/dgtrainer/v1/tasks').then(response => {
//          // success callback
//          this.text2=response.request.responseText;
//        }, response => {
//          // error callback
//        })
//      },
//      third:function () {
//        this.$http.get('http://192.168.6.66:8081/dgtrainer/v1/task/'+this.taskid+'/logs').then(response => {
//          // success callback
//          this.text3=response.request.responseText;
//        }, response => {
//          // error callback
//        })
//
//      },
//      forth:function () {
//           this.$http.get('http://192.168.6.66:8081/dgtrainer/v1/task/'+this.taskid).then(response => {
//             // success callback
//             this.text4=response.request.responseText;
//           }, response => {
//             // error callback
//           })
//      },
//      fifth:function () {
//         this.$http.get('http://192.168.6.66:8081/dgtrainer/v1/images').then(response => {
//           // success callback
//           this.text5=response.request.responseText;
//         }, response => {
//           // error callback
//         })
//      },
//      sixth:function () {
//        this.$http.get('http://192.168.6.66:8081/dgtrainer/v1/resources').then(response => {
//          // success callback
//          this.text6=response.request.responseText;
//        }, response => {
//          // error callback
//          })
//      },
//      deletetask:function () {
//        var xhr = new XMLHttpRequest();
//        xhr.open('DELETE','http://192.168.6.66:8081/dgtrainer/v1/task/'+this.taskid+'?Status=333&Message=aaaaaaa', true);
//        xhr.onreadystatechange = function() {
//          if (xhr.readyState == 4 && xhr.status == 200) {
//            console.log('success');
//          }
//        }
//        xhr.setRequestHeader("Content-Type", "application/json ;charset=utf-8");
//        xhr.setRequestHeader("Accept", "application/json");
//        xhr.send();
//      },

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav{

}
.main-show{
  width:80%;
  margin:0 auto;
}
.resource{

  margin-top: 20px;
}
.list{
  margin-top: 30px;
}


.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-table .info-row {
  background: #c9e5f5;
}

.el-table .positive-row {
  background: #e2f0e4;
}


</style>
