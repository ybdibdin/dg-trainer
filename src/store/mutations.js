
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
  getchartsource:(state,source)=>{
    //console.log('soruce',source);
    state.source=source
  },
  changedeter:(state,change)=>{
    state.data.deter=change;
  }

}


export default mutations
