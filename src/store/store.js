import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
// 注册vuex
Vue.use(Vuex)

let state={
  data:{
    resourcelist:[],
    tasklist:[],
    sum:[],
    docker:[],
    dockertag:[],
    deter:false
  },
  file:{
    filelist:[],
    filecontent:''
  },
  source:{
    source:[]
  }

}


export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
