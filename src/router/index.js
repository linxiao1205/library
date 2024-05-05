import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout.vue'
import Index from '../views/Index.vue'
import Reader from '../views/user/Reader.vue'
import Bookshelf from '../views/system/Bookshelf.vue'
import Message from '../views/system/Message.vue'
import Drawing from '../views/library/Drawing.vue'
import Record from '../views/library/Record.vue'
import Type from '../views/library/Type.vue'
import Psw from '../views/change/Psw.vue'
import Lend from '../views/borrow/Lend.vue'
import Oneself from '../views/change/oneself.vue'
import Query from '../views/borrow/Query.vue'
import NProgress from 'nprogress' //第一步导入nprogress
import 'nprogress/nprogress.css' //第二步导入nprogress样式
import { useTokenStore } from '@/store/mytoken'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Layout',
      meta: { title: '登录' },
      component: Layout,
    },
    {
      path: '/',
      name: 'index',
      meta: { title: '首页', requiresAuth: true }, //requiresAuth 表示是否需要登录验证
      redirect: '/drawing', //重定向
      component: Index,
      children: [
        //二级路由
        {
          path: '/reader',
          name: 'reader',
          meta: { title: '读者管理' },
          component: Reader,
        },
        {
          path: '/bookshelf',
          name: 'bookshelf',
          meta: { title: '书架设置' },
          component: Bookshelf,
        },
        {
          path: '/message',
          name: 'message',
          meta: { title: '图书馆信息' },
          component: Message,
        },
        {
          path: '/drawing',
          name: 'drawing',
          meta: { title: '统计报表' },
          component: Drawing,
        },
        {
          path: '/record',
          name: 'record',
          meta: { title: '图书档案管理' },
          component: Record,
        },
        {
          path: '/type',
          name: 'type',
          meta: { title: '图书类型' },
          component: Type,
        },
        {
          path: '/psw',
          name: 'psw',
          meta: { title: '修改密码' },
          component: Psw,
        },
        {
          path: '/oneself',
          name: 'oneself',
          meta: { title: '修改个人信息' },
          component: Oneself,
        },
        {
          path: '/lend',
          name: 'lend',
          meta: { title: '图书借阅' },
          component: Lend,
        },
        {
          path: '/query',
          name: 'query',
          meta: { title: '图书查询' },
          component: Query,
        },
      ],
    },
  ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
  //使用路由守卫对网页进行跳转
  NProgress.start()
  //验证token，只有存在token的时候才能跳转到内容页

  if (to.path === '/login') {
    next()
  } else {
    if (!window.localStorage.getItem('TokenInfo')) {
      next({
        path: '/login',
      })
    } else {
      // 不写代表直接可以过去
      next()
    }
  }
})

router.afterEach((to, from) => {
  //使用路由守卫对网页标题进行切换
  // 如果有 to.meta.title才加，不然不加，这是保护没有title的就不加
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  NProgress.done() //使用路由守卫对网页进行跳转
})
export default router
