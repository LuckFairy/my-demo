import Vue from 'vue'
import Router from 'vue-router'
//引入.vue组件
import Tel from '@/components/tel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Tel
    },
    {
      path: '/login',
      redirect: '/index.php?c=index&a=check_coupon',
      name: 'login'
    }
  ]
})
