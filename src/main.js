// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from "./router";//引入管理router的js文件
import axios from 'axios'

Vue.config.productionTip = true
Vue.prototype.axios = axios


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
