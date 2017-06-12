
import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/home/'
import TopicVid from '../pages/topic/vid/'
import Username from '../pages/user/'
import TopicPublish from '../pages/topic/publish/'
import MyHome from '../pages/my/home/'
import MyMessage from '../pages/my/messages/'
import Login from '../pages/login/'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Index
    },
    {
      path: '/topic/publish', 
      //必须把这个写在topic/:vid前面
      //否则他会按照规则进行匹配
      component: TopicPublish
    },
    {
      name: 'topic',
      path: '/topic/:vid',
      component: TopicVid
    },
    {
      path: '/user/:username',
      component: Username
    },
    {
      path: '/my/home',
      component: MyHome
    },
    {
      path: '/my/messages',
      component: MyMessage
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
