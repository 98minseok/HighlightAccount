import { createRouter, createWebHistory } from 'vue-router'

import TestView from '@/view/Register.vue'
import FeeView from '@/view/FeeView.vue'
import HomeView from '@/view/Home.vue'
import Login from '@/view/Login.vue'
import Convert from '@/view/Convert.vue'
import Register from '@/view/Register.vue'
import MemberList from '@/components/MemberList.vue'
import ExpenseView from '@/view/ExpenseView.vue'

const routes = [
  { path : '/' , component : HomeView , children : [
    { path: '/fee', component: FeeView },
    { path: '/test', component: TestView },
    { path: '/memberList', component : MemberList},
    { path: '/main' , component : Convert},
    { path: '/expense', component : ExpenseView}
  ]},
  { path: '/login', component : Login},
  { path: '/convert', component : Convert},
  { path: '/register' , component : Register},
  { path: '/*' , redirect : "/"}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;