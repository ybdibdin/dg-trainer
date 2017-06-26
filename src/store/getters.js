const getters={
    source:state=>{
      var result=[];
      var res=[];
      state.source.source.forEach(function (ele, index, self) {
        for(let x in ele){
          //console.log(ele[0]['loss'])
          result.push({
            name:x.toString(),
            value:[x.toString(),ele[x]['loss']]
          })
        }

      })
      for(let i=0;i<1000;i++){
        res.push(result.pop());
      }
      return res;
    }
}

export default getters
