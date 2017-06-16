
const mutations={

  getData:(state,data)=>{
    state.data=data;
},
  deleteitem:(state,item)=>{
    state.data.tasklist.splice(item,1)
  }

}


export default mutations
