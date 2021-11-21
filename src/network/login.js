import {request} from './request'

export function login(phone,password){
  return request({
    url:'/login/cellphone',
    withCredentials: true,
    params:{
      phone,
      password,
      random: Math.random()
    }
  })
}
export function getLoginStatus(cookie){
  return request({
    url:'/login/status',
    params:{
      random: Math.random(),
      cookie
    },
  })
}
// export function getUserLikeSong(uid){
//   return request({
//     url:'/likelist',
//     params:{
//       uid
//     },
//     withCredentials: true,
//   })
// }
export function getUserAccount(cookie){
  return request({
    url:'/user/account',
    params:{
      random: Math.random(),
      cookie
    },
  })
}
export function getUserSongList(uid,cookie){
  return request({
    url:'/user/playlist',
    params:{
      uid,
      cookie,
      random: Math.random()
    },
    // withCredentials: true,
  })
}
export function getPurchasedSong(cookie){
  return request({
    url:'/song/purchased',
    params:{
      cookie:cookie,
      random: Math.random()
    }
  })
}
export function logout(cookie){
  return request({
    url:'/logout',
    params:{
      random: Math.random(),
      cookie
    },
  })
}
export function refreashLoginStatus() {
  return request({
    url:'/login/refresh'
  })
}