import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Label from '@/pages/Label'
import UpdateLabel from '@/pages/UpdateLabel'
import Feature from '@/pages/Feature'
import TestAiLabelFace from '@/pages/TestAiLabelFace'
import NosePoint from '@/pages/NosePoint'

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
      path: '/update_label',
      name: 'UpdateLabel',
      component: UpdateLabel
    },
    {
      path: '/feature',
      name: 'Feature',
      component: Feature
    },
    {
      path: '/test',
      name: 'TestAiLabelFace',
      component: TestAiLabelFace
    },
    {
      path: '/nose_point',
      name: 'NosePoint',
      component: NosePoint
    }
  ]
})
