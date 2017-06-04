import './common/css/reset.css'
import './iconfont/iconfont.css'

import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import components from './components/'
import * as filters from './filters/'

Object.keys(components).forEach(key => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
  Vue.component(`v${name}`, components[key]) //转换为vFooter
})

//注册全局过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) 

Vue.config.productionTip = false

Vue.prototype.$http = axios


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})