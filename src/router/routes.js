
const routes = [
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      authAdmin: true
    },
    children: [
      { path: '', name: 'dashboardAdmin', component: () => import('pages/admin/Index.vue') },
      { path: 'inputmakanan', name: 'inputmakanan', component: () => import('pages/admin/inputmakanan.vue') },
      { path: 'datauser', name: 'datauser', component: () => import('pages/admin/DataUser.vue') },
      { path: 'datamakanan', name: 'datamakanan', component: () => import('pages/admin/Datamakanan.vue') },
      { path: 'formedit/:idmakanan', name: 'formEdit', component: () => import('pages/admin/Formedit.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/UserLayout.vue'),
    meta: {
      authUser: true
    },
    children: [
      { path: '', name: 'menuMakanan', component: () => import('pages/user/Index.vue') },
      { path: 'MyOrder', name: 'MyOrder', component: () => import('pages/user/MyOrder.vue') },
      { path: 'about', name: 'about', component: () => import('pages/user/About.vue') }
    ]
  },
  {
    path: '',
    name: 'loginpage',
    component: () => import('pages/guest/Login.vue')
  },
  {
    path: '/register',
    name: 'registerpage',
    component: () => import('pages/guest/Register.vue')
  }
]
// Always leave this as last one,
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
