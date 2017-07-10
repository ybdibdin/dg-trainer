
const mutations={

  getresource:(state,data)=>{
    state.data.resourcelist=data.resourcelist;
    //console.log("state",state)
},
  gettask:(state,data) =>{
    state.data.tasklist=data.tasklist;
  },
  getimage:(state,data)=>{
    state.data.docker=data.docker;
    state.data.dockertag=data.dockertag;
  },
  deleteitem:(state,item)=>{
    state.data.tasklist.splice(item,1)
  },
  gettaskdetail:(state,datafile)=>{
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
