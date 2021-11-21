import { createRouter, createWebHashHistory } from 'vue-router'
import app from '../main'

const find = () => import('views/find/find.vue')
const media = () => import('views/media/media.vue')
// const mediaRec = () => import('views/media/mediaRec.vue')
// const mediaCategory = () => import('views/media/mediaCategory.vue')
const profile = () => import('views/profile/profile.vue')
const communicate = () => import('views/communicate/communicate.vue')
const login = () => import('views/login/login.vue')
const songList = () => import('views/songList/songList.vue')
const allList = () => import('views/allSongList/allSongList.vue')
const rank = () => import('views/rankingList/rank.vue')

const search = () => import('views/search/search.vue')
const hotSearch = () => import('views/search/childComp/hotSearch.vue')
const searchDetail = () => import('views/search/childComp/searchDetail.vue')

// const Comment = () =>import('views/comment/comment.vue')

const routes = [
  {
    path: '',
    redirect: '/find'
  },
  {
    path: '/find',
    name: 'find',
    meta: {
      keepAlive: true
    },
    component: find
  },
  {
    path: '/media',
    name: 'media',
    component: media,
    // children:[
    //   {
    //     path:'recMedia',
    //     component:mediaRec,
    //   },
    //   {
    //     path:'mediaCategory',
    //     component:mediaCategory,
    //   }
    // ],
    meta: {
      keepAlive: true
    },
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      keepAlive: true
    },
    component: profile

  },
  {
    path: '/communicate',
    name: 'communicate',
    component: communicate,
    meta: {
      keepAlive: true
    },
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/songList',
    name: 'songList',
    component: songList
  },
  {
    path: '/allSongList',
    name: 'allSongList',
    component: allList,
    meta: {
      keepAlive: true
    },
  },
  {
    path: '/rankingList',
    name: 'rankingList',
    component: rank,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/search',
    name: 'search',
    redirect: '/search/hotSearch',
    children: [
      {
        path: 'hotSearch',
        component: hotSearch
      },
      {
        path: 'searchDetail',
        component: searchDetail,
        meta:{
          keepAlive: true
        }
      }
    ],
    component: search,
    meta:{
      keepAlive:false
    }
  },
  // {
  //   path:'/comment',
  //   name:'comment',
  //   component:Comment
  // }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   app.config.globalProperties.transition = 'slide-none';
//   if (from.meta.tree > to.meta.tree) {
//     // 后退,向右滑动
//     app.config.globalProperties.transition = 'slide-right';
//     from.meta.keepAlive = false;
//     to.meta.keepAlive = true;
//   } else if (from.meta.tree < to.meta.tree) {
//     // 前进,向左滑动
//     app.config.globalProperties.transition = 'slide-left';
//     from.meta.keepAlive = true;
//     to.meta.keepAlive = false;
//   } else {
//     // 同一层级,无动画
//     app.config.globalProperties.transition = 'slide-none';
//     from.meta.keepAlive = true;
//     to.meta.keepAlive = true;
//   }
//   next();
// })
export default router
