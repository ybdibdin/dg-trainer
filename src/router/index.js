import Vue from 'vue'
import Router from 'vue-router'
import ctask from '@/components/createtask'
//import create from '@/components/create'
//import detail from '@/components/detail'
import index from '@/components/panel'
import createtask from '@/components/createtask'
import resourcelist from '@/components/resourcelist'
import tasklist from '@/components/tasklist'
import image from '@/components/image'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },{
      path:'/createtask',
      name:'createtask',
      component:createtask
    },{
      path:'/resourcelist',
      name:'resourcelist',
      component:resourcelist
    },{
      path:'/tasklist',
      name:'tasklist',
      component:tasklist
    },{
      path:'/image',
      name:'image',
      component:image
    }

  ]
})
