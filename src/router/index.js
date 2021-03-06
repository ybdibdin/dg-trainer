import Vue from 'vue'
import Router from 'vue-router'
import ctask from '@/components/createtask'
//import create from '@/components/create'
import code from '@/components/code'
import chart from '@/components/panel'
import create from '@/components/create'
import resourcelist from '@/components/resourcelist'
import tasklist from '@/components/tasklist'
import image from '@/components/image'
import detail from '@/components/detail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'chart',
      component: chart
    },{
      path:'/create',
      name:'create',
      component:create,
    },{
      path:'/resourcelist',
      name:'resourcelist',
      component:resourcelist
    },{
      path:'/tasklist',
      name:'tasklist',
      component:tasklist,
    },{
      path:'/image',
      name:'image',
      component:image
    },{
      path:'/detail/:index',
      name:'detail',
      component:detail,
    },{
      path:'/code',
      name:'code',
      component:code
    }

  ]
})
