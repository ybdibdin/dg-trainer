<template>
  <div>


    <div class="main-show">
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
                  <el-form-item label="unreserved_resources">
                    <span>{{ props.row.unreservedR }}</span>
                  </el-form-item>
                  <el-form-item label="used_resources">
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
          style="width: 100%">
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
                  <span>{{ props.row.state }}</span>
                </el-form-item><br />
                <el-form-item label="state_message:">
                  <span>{{ props.row.state_message }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="task_iD"
            prop="name">
          </el-table-column>
          <el-table-column
            label="task_state"
            prop="state">
          </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>
    </div>
    </div>




</template>

<script>
  export default {
    data () {
      return {
        tableData: [],
        tableData1: []
      }
    },
    created: function () {
        //get resource
      this.$http.get('http://192.168.6.66:8081/dgtrainer/v1/resources').then(response => {
        // success callback
        //console.log(response);
        //console.log(JSON.stringify(response.data.slaves[0].resources))
        // console.log(JSON.parse(response.request.response).slaves.length);
        for(var i=0;i<response.data.slaves.length;i++){
            var objtemp={
                id:response.data.slaves[i].id,
                hostname:response.data.slaves[i].hostname,
                resource:JSON.stringify(response.data.slaves[i].resources),
                offeredR:response.data.slaves[i].offered_resources,
                unreservedR:response.data.slaves[i].unreserved_resources,
                usedR:response.data.slaves[i].used_resources
            }
            this.tableData.push(objtemp);
        }
      }, response => {
        // error callback
      })
      //get tasklist
      this.$http.get('http://192.168.6.66:8081/dgtrainer/v1/tasks').then(response => {
         console.log(response)
          for(var x in response.data){
              if(response.data[x]){
                  //console.log(response.data[x].name);
                  var temp={
                      name:response.data[x].name,
                      cmd:response.data[x].cmd,
                      WaitingTime:response.data[x].WaitingTime,
                      dependency_uris:JSON.stringify(response.data[x].dependency_uris),
                      docker_image:response.data[x].docker_image,
                      instances:response.data[x].instances,
                      resources:JSON.stringify(response.data[x].resources),
                      state:response.data[x].state,
                      state_message:response.data[x].state_message
                  }
                this.tableData1.push(temp);
              }
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
                console.log(arr);
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
        handleDelete:function (index, row) {
            this.tableData1.splice(index, 1);
          console.log(this.tableData1[index].name);
          this.$http({
            url:'http://192.168.6.66:8081/dgtrainer/v1/task/'+this.tableData1[index].name,
            method:'get',
//            headers: {
//                'Content-Type': 'application/json ;charset=utf-8',
//                'Access-Control-Request-Method':'DELETE'
//            }
          }).then((res)=>{
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

</style>
