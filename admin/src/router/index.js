import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

import Login from '../views/login.vue'

import categoryEdit from '../views/categoryEdit.vue'
import categoryList from '../views/categoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdsEdit from '../views/AdsEdit.vue'
import AdsList from '../views/AdsList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter);

const routes = [
  {
    path:'/login',name:'login',component:Login,meta:{isPublic:true}
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {path: '/categories/create',component: categoryEdit},
      {path: '/categories/list',component: categoryList},
      {path: '/categories/edit/:id',component: categoryEdit,props:true},

      {path: '/items/create',component: ItemEdit},
      {path: '/items/list',component: ItemList},
      {path: '/items/edit/:id',component: ItemEdit,props:true},

      {path: '/heroes/create',component: HeroEdit},
      {path: '/heroes/list',component: HeroList},
      {path: '/heroes/edit/:id',component: HeroEdit,props:true},

      {path: '/articles/create',component: ArticleEdit},
      {path: '/articles/list',component: ArticleList},
      {path: '/articles/edit/:id',component: ArticleEdit,props:true},

      {path: '/ads/create',component: AdsEdit},
      {path: '/ads/list',component: AdsList},
      {path: '/ads/edit/:id',component: AdsEdit,props:true},

      {path: '/admin_users/create',component: AdminUserEdit},
      {path: '/admin_users/list',component: AdminUserList},
      {path: '/admin_users/edit/:id',component: AdminUserEdit,props:true},
    ]
  },
];

const router = new VueRouter({
  routes
});

router.beforeEach((to,from,next)=>{
  //判断是否含有isPublic和token
  if (!to.meta.isPublic&&!localStorage.token){
    return next('/login')
  }
  next()
});


export default router
