import { createRouter, createWebHistory } from 'vue-router'
import Server from './scenes/Server.vue'

const routes = [
  {
    path: '/',
    name: 'Server',
    component: Server
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
