import Vue from 'vue'
import Router from 'vue-router'
import Register from '../components/Register'
import login from '../components/login'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
