import { createRouter, createWebHistory } from 'vue-router'

import TestView from '@/view/TestView.vue'
import FeeView from '@/view/FeeView.vue'
import HomeView from '@/view/HomeView.vue'

const routes = [
  { path : '/' , component : HomeView},
  { path: '/fee', component: FeeView },
  { path: '/test', component: TestView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;