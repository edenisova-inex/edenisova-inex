import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import freestyle from '@/components/freestyle.vue';
import editlist from '@/components/edit-list.vue';
import results from '@/components/appresultstab.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Freestyle',
    component: freestyle
  },
  {
    path: '/freestyle',
    name: 'Freestyle',
    component: freestyle
  },
  {
    path: '/list', // not ready
    name: 'List',
    component: editlist
  },
  {
    path: '/result', // not ready
    name: 'Results',
    component: results
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
