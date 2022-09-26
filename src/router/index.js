import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import axios from "axios";
import store from "../store"

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Home',
    component: () => import('../views/Home'),
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('../views/Index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',

    component: () => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  let hasRoute = store.state.menus.hasRoutes

  let token = localStorage.getItem("token")

  if (to.path === '/login' || to.path === '/register') {
    next()

  } else if (!token) {
    next({path: '/login'})


  } else if(token && !hasRoute) {              //第一次访问首页，会从后端获取菜单列表、权限信息及菜单的路由
    axios.get("/sys/menu/nav", {
      headers: {
        authorization: localStorage.getItem("token")
      }
    }).then(res => {

      console.log(res.data.data)

      // 拿到menuList
      store.commit("setMenuList", res.data.data.nav)

      // 拿到用户权限
      store.commit("setPermList", res.data.data.authoritys)

      console.log(store.state.menus.menuList)

      // 动态绑定路由
      let newRoutes = router.options.routes

      res.data.data.nav.forEach(menu => {
        if (menu.children) {
          menu.children.forEach(e => {

            // 转成路由
            let route = menuToRoute(e)

            // 把路由添加到路由管理中
            if (route) {
              newRoutes[0].children.push(route)     //添加到Home的子路由
            }

          })
        }
      })

      console.log("newRoutes")
      console.log(newRoutes)
      router.addRoutes(newRoutes)

      hasRoute = true
      store.commit("changeRouteStatus", hasRoute)
    })
  }

  next()
})

// 导航转成路由
const menuToRoute = (menu) => {

  if (!menu.component) {
    return null
  }

  let route = {
    name: menu.name,
    path: menu.path,
    meta: {
      icon: menu.icon,
      title: menu.title
    }
  }
  route.component = () => import('@/views/' + menu.component +'.vue')

  return route
}

export default router
