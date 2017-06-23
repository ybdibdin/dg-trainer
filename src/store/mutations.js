
const mutations={

  getData:(state,data)=>{
    state.data=data;
    //console.log("state",state)
},
  deleteitem:(state,item)=>{
    state.data.tasklist.splice(item,1)
  },


}


export default mutations
