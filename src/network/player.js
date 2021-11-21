import {request} from './request'

export function getMusicUrl(id,cookie){
  return request({
    withCredentials: true,
    url:'/song/url',
    params:{
      id,
      cookie,
      random:Math.random()
    }
  })
}

export function getLyric(id){
  return request({
    url:'/lyric',
    params:{
      id
    }
  })
}