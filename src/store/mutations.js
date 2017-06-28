
const mutations={

  getData:(state,data)=>{
    state.data=data;
    //console.log("state",state)
},
  deleteitem:(state,item)=>{
    state.data.tasklist.splice(item,1)
  },
  gettasklist:(state,datafile)=>{
    state.file=datafile
  },
  getchartsource:(state,source)=> {

    if(source.begin == 0){
      state.source=source.source;
    }else{
      state.source=state.source.concat(source.source);
      // state.source=state.source.reverse().slice(0,2000).reverse();
      // console.log(state.source.length);
    }

  }

}


export default mutations
