const getters={
    loss:state=>{
      let result=[];
      state.source.source.forEach(function (ele, index, self) {
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
    state.source.source.forEach(function (ele, index, self) {
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
    state.source.source.forEach(function (ele, index, self) {
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
