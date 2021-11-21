import {request} from './request'

// export function getBanners(){
//   return request({
//     url:'/banner',
//     // params:{
//     //   type
//     // }
//   })
// }
export function getFind(refresh,cursor,cookie){
  return request({
    withCredentials: true,
    url:'/homepage/block/page',
    params:{
      refresh,
      cursor,
      cookie,
      random: Math.random()
    }
  })
}
export function getBall(){
  return request({
    url:'/homepage/dragon/ball',
  })
}
// export function getRecommendPlayList(){
//   return request({
//     url:'/personalized',
//     withCredentials: true,
//     params:{
//       random: Math.random()
//     }
//   })
// }
export function getRecNewSong(limit){
  return request({
    url:'/personalized/newsong',
    params:{
      limit
    }
  })
}
export function getNewAlbumn(){
  return request({
    url:'/album/newest'
  })
}
export function getHotSinger(limit){
  return request({
    url:'/top/artists',
    params:{
      limit
    }
  })
}
export function getPersonerFM(){
  return request({
    withCredentials: true,
    url:'/personal_fm',
    params:{
      random: Math.random()
    }
  })
}