import Vue from 'vue'
import VueRouter from 'vue-router'
import PageNotFound from '../views/PageNotFound'
import Home from '@/views/PageHome'
import Register from '@/views/PageRegister'
import SignIn from '@/views/PageSignIn'
import Profile from '@/views/PageProfile'
import Category from '@/views/PageCategory'
import Forum from '@/views/PageForum'
import ThreadCreate from '../views/PageThreadCreate'
import Thread from '../views/PageThread'
import ThreadEdit from '../views/PageThreadEdit'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'Nout Found',
    component: PageNotFound
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: { requiresGuest: true }
  },
  {
    path: '/logout',
    name: 'SignOut',
    meta: { requiresAuth: true },
    beforeEnter (to, from, next) {
      store.dispatch('signOut')
        .then(() => next({ name: 'Home' }))
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    props: true,
    // beforeEnter (to, from, next) {
    //   if (store.state.authId) {
    //     next()
    //   } else {
    //     next({ name: 'Home' })
    //   }
    // }
    // meta
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/edit',
    name: 'ProfileEdit',
    component: Profile,
    props: { edit: true },
    meta: { requiresAuth: true }
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category,
    props: true
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: Forum,
    props: true
  },
  {
    path: '/thread/create/:forumId',
    name: 'ThreadCreate',
    component: ThreadCreate,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/thread/:id',
    name: 'Thread',
    component: Thread,
    props: true
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    component: ThreadEdit,
    props: true,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// global navigation guards
router.beforeEach((to, from, next) => {
  console.log(`🚦 navigating to ${to.name} from ${from.name}`)
  store.dispatch('auth/initAuthentication')
    .then(user => {
      if (to.matched.some(route => route.meta.requiresAuth)) {
        // protected route
        if (user) {
          next()
        } else {
          next({ name: 'SignIn', query: { redirectTo: to.path } })
        }
      } else if (to.matched.some(route => route.meta.requiresGuest)) {
        // protected route
        if (!user) {
          next()
        } else {
          next({ name: 'Home' })
        }
      } else {
        next()
      }
    })
})

export default router
