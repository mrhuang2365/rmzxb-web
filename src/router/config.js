export default [
  {
    path: '/',
    name: 'home',
    component: (r) => require.ensure([], () => r(require('@/pages/HomePage/index.vue'))),
    redirect: 'top',
    children: [
      {
        path: '/top',
        name: 'top',
        component: (r) => require.ensure([], () => r(require('@/pages/top/index.vue'))),
        meta: {
          title: '头条'
        }
      },
      {
        path: '/zhengxie',
        name: 'zhengxie',
        component: (r) => require.ensure([], () => r(require('@/pages/top/index.vue'))),
        meta: {
          title: '政协'
        }
      },
      {
        path: '/tongzhan',
        name: 'tongzhan',
        component: (r) => require.ensure([], () => r(require('@/pages/top/index.vue'))),
        meta: {
          title: '统战'
        }
      },
      {
        path: '/redian',
        name: 'redian',
        component: (r) => require.ensure([], () => r(require('@/pages/top/index.vue'))),
        meta: {
          title: '热点'
        }
      },
      {
        path: '/yuanchuang',
        name: 'yuanchuang',
        component: (r) => require.ensure([], () => r(require('@/pages/top/index.vue'))),
        meta: {
          title: '原创'
        }
      },
      {
        path: '/shoufa',
        name: 'shoufa',
        component: (r) => require.ensure([], () => r(require('@/pages/top/index.vue'))),
        meta: {
          title: '首发'
        }
      },
      {
        path: '/wechat',
        name: 'wechat',
        component: (r) => require.ensure([], () => r(require('@/pages/top/index.vue'))),
        meta: {
          title: '微信公众号'
        }
      },
      {
        path: '/other',
        name: 'other',
        component: (r) => require.ensure([], () => r(require('@/pages/top/index.vue'))),
        meta: {
          title: '其他'
        }
      },
      {
        path: '/info',
        name: 'info',
        component: (r) => require.ensure([], () => r(require('@/pages/top/info.vue'))),
        meta: {
          title: '文章详情'
        }
      },
      {
        path: '/tongji',
        name: 'tongji',
        component: (r) => require.ensure([], () => r(require('@/pages/tongji/index.vue'))),
        meta: {
          title: '统计'
        }
      },
      {
        path: '/NotFound',
        name: 'NotFound',
        component: (r) => require.ensure([], () => r(require('@/pages/NotFound/index.js'))),
        meta: {
          title: '404'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: (r) => require.ensure([], () => r(require('@/pages/login/index.vue')))
  }
]
