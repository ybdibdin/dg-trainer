// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import vuex from 'vuex'
import store from './store/store'
import VueCodeMirror from 'vue-codemirror'



Vue.prototype.$http = axios
Vue.use(VueCodeMirror)
Vue.use(ElementUI)
Vue.use(vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  beforeCreate() {
    this.$store.dispatch('getResource', this);
    this.$store.dispatch('getImage',this);
    this.$store.dispatch('getTask',this);
  },
//   created(){
//     var that=this;
//     setInterval(function () {
//       //console.log('that',that.$store);
//       that.$store.dispatch('getAllData', that)
//     },5000)
// }
})
