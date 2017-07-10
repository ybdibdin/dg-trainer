const getters={

    resourcestate:state=>{
      let cpus=0,gpus=0,mem=0,disk=0;
      let ucpus=0,ugpus=0,umem=0,udisk=0;
      for(var x=0;x<state.data.resourcelist.length;x++){
        cpus+=state.data.resourcelist[x].resource.cpus;
        gpus+=state.data.resourcelist[x].resource.gpus;
        mem+=state.data.resourcelist[x].resource.mem;
        disk+=state.data.resourcelist[x].resource.disk;
        ucpus+=state.data.resourcelist[x].usedR.cpus;
        ugpus+=state.data.resourcelist[x].usedR.gpus;
        umem+=state.data.resourcelist[x].usedR.mem;
        disk==state.data.resourcelist[x].usedR.disk;
      }
      return [cpus,gpus,mem,disk,ucpus,ugpus,umem,udisk];
    },
    chartlen:state=>{
       return state.source.length;
    },
    loss:state=>{
      let result=[];
      state.source.forEach(function (ele, index, self) {
        for(let x in ele){
          //console.log(ele[0]['loss'])
          result.push({
            name:(x+'loss').toString(),
            value:[x.toString(),ele[x]['loss']]
          })
        }

      })
      return result;
    },
  lr:state=>{
    let result=[];
    state.source.forEach(function (ele, index, self) {
      for(let x in ele){
        //console.log(ele[0]['loss'])
        result.push({
          name:(x+'lr').toString(),
          value:[x.toString(),ele[x]['lr']]
        })
      }

    })
    return result;
  },
  loss_belt:state=>{
    let result=[];
    state.source.forEach(function (ele, index, self) {
      for(let x in ele){
        //console.log(ele[0]['loss'])
        result.push({
          name:(x+'loss_belt').toString(),
          value:[x.toString(),ele[x]['loss3/loss3_driver_belt']]
        })
      }

    })
    return result;
  }

}

export default getters
