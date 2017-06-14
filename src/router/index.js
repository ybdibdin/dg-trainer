import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import create from '@/components/create'
import detail from '@/components/detail'
import panel from '@/components/panel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'panel',
      component: panel
    },{
      path:'/create',
      name:'create',
      component:create
    },{
      path:'/detail',
      name:'detail',
      component:detail
    }
  ]
})
