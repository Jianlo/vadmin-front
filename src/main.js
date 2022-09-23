import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Element from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(Element)

import axios from 'axios'

//修改前端axios请求地址
axios.defaults.baseURL = "http://localhost:8088"

Vue.prototype.$axios = axios //

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
