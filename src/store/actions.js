const actions={

  getAllData:async ({commit},that) =>{
    //console.log('count!')
      let resourcelist=[];
      let tasklist=[];
      let sum=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
      let docker=[];
      let dockertag=[];
      await that.$http.get('http://192.168.6.66:8082/dgtrainer/v1/resources').then(response => {
        // success callback
        //console.log('getAllData;',response);
        //console.log(JSON.stringify(response.data.slaves[0].resources))
        // console.log(JSON.parse(response.request.response).slaves.length);
        for(var i=0;i<response.data.slaves.length;i++){
          //console.log(response.data.slaves[i].used_resources.gpus)
          var objtemp={
            id:response.data.slaves[i].id,
            hostname:response.data.slaves[i].hostname,
            resource:response.data.slaves[i].resources,
            offeredR:response.data.slaves[i].offered_resources,
            unreservedR:response.data.slaves[i].unreserved_resources,
            usedR:response.data.slaves[i].used_resources
          }
          sum[0][0]=response.data.slaves[i].resources.cpus;
          sum[0][1]+=response.data.slaves[i].offered_resources.cpus;
          sum[0][2]+=parseInt(response.data.slaves[i].unreserved_resources.cpus);
          sum[0][3]+=parseInt(response.data.slaves[i].used_resources.cpus);
          sum[1][0]+=Number(response.data.slaves[i].resources.gpus);
          sum[1][1]+=Number(response.data.slaves[i].offered_resources.gpus);
          sum[1][2]+=Number(response.data.slaves[i].unreserved_resources.gpus);
          sum[1][3]+=Number(response.data.slaves[i].used_resources.gpus);
          sum[2][0]+=Number(response.data.slaves[i].resources.mem);
          sum[2][1]+=Number(response.data.slaves[i].offered_resources.mem);
          sum[2][2]+=Number(response.data.slaves[i].unreserved_resources.mem);
          sum[2][3]+=Number(response.data.slaves[i].used_resources.mem);
          sum[3][0]+=Number(response.data.slaves[i].resources.disk);
          sum[3][1]+=Number(response.data.slaves[i].offered_resources.disk);
          sum[3][2]+=Number(response.data.slaves[i].unreserved_resources.disk);
          sum[3][3]+=Number(response.data.slaves[i].used_resources.disk);
          resourcelist.push(objtemp);
        }

      }, response => {
        // error callback
      })
      await that.$http.get('http://192.168.6.66:8082/dgtrainer/v1/tasks').then(response => {
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
              resources:response.data[x].resources,
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
            tasklist.push(temp);
          }
          tasklist.sort(function (x,y) {
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

      await that.$http.get('http://192.168.6.66:8082/dgtrainer/v1/images').then(response => {
        // success callback
        //console.log('docker',response.data);
        docker=response.data;

      }, response => {
        // error callback
      })

      await that.$http.get('http://192.168.6.66:8082/dgtrainer/v1/image/caffe/tags').then(response => {
        // success callback
        //console.log('docker',response.data);
        dockertag=response.data;

      }, response => {
        // error callback
      })

      commit('getData',{resourcelist,tasklist,sum,docker,dockertag})


  },
  getTaskList:async({commit},{that,id})=>{
    //console.log('gettasklist',id);
    let reslist=[];
    let filecontent='';
    let filelist=[];
    let logs='';
    await that.$http.get('http://192.168.6.66:8082/dgtrainer/v1/task/'+id+'/files').then(response =>{
      //console.log('filelist',response.data);
      filelist=response.data;
    },response=>{})

    await that.$http.get('http://192.168.6.66:8082/dgtrainer/v1/task/'+id+'/file?filename=script/train.sh').then(response=>{
      //console.log('filecontent',response.data);
      filecontent=response.data;
    },response=>{})
    await that.$http.get('http://192.168.6.66:8082/dgtrainer/v1/task/'+id+'/logs').then(response=>{
      //console.log('logs',response.data);
      logs=response.data;
    },response=>{})

    commit('gettasklist',{filelist,filecontent,logs})
  },



  getChartSource:({commit},{that,id,begin})=>{
    if(begin==undefined){
      begin =0;
    }
    let end =0;
    if(begin == 0){
       end=2000;
     }else{
      end=begin+200;
    }
     //console.log(begin,'end',end);
    that.$http.get('http://192.168.6.66:8082/dgtrainer/v1/task/'+id+'/statistics?start='+begin+'&end='+end).then(response =>{
      //console.log('source',response.data);
      var source=response.data;
      commit('getchartsource',{source,begin})
    },response=>{})



  }

}

export default actions
