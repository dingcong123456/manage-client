import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'

import Login from '@/pages/Login'
import Register from '@/pages/Register'

import Pc from '@/pages/Pc'
import Train from '@/pages/Train'
import Label from '@/pages/Label'
import UpdateLabel from '@/pages/UpdateLabel'
import Feature from '@/pages/Feature'
import TestAiLabelFace from '@/pages/TestAiLabelFace'
import NosePoint from '@/pages/NosePoint'

import choose from '@/pages/label/choose'
import forehead from '@/pages/label/forehead'
import jaw from '@/pages/label/jaw'
import users from '@/pages/label/users'

import middleware from './middleware';

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/choose'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/choose',
      component: choose,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/forehead',
      component: forehead,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/users',
      component: users,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/jaw',
      component: jaw,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/pc',
      component: Pc,
      children: [
        {
          path: 'index',
          name: 'Index',
          component: Index
        },
        {
          path: 'train',
          name: 'Train',
          component: Train
        },
        {
          path: 'label',
          name: 'Label',
          component: Label
        },
        {
          path: 'update_label',
          name: 'UpdateLabel',
          component: UpdateLabel
        },
        {
          path: 'feature',
          name: 'Feature',
          component: Feature
        },
        {
          path: 'test',
          name: 'TestAiLabelFace',
          component: TestAiLabelFace
        },
        {
          path: 'nose_point',
          name: 'NosePoint',
          component: NosePoint
        }
      ]
    },

  ]
});
router.beforeEach(middleware.checkAuth());
export default router;
