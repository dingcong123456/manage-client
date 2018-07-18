import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Label from '@/pages/Label'
import TestAiLabelFace from '@/pages/TestAiLabelFace'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/label',
      name: 'Label',
      component: Label
    },
    {
      path: '/test',
      name: 'TestAiLabelFace',
      component: TestAiLabelFace
    }
  ]
})
