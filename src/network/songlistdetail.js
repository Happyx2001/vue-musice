import {request} from './request'

export function getSongListInfo(id,cookie){
  return request({
    url:'/playlist/detail',
    withCredentials: true,
    params:{
      id,
      cookie,
      random: Math.random()
    }
  })
}
export function getMediaSongListInfo(rid){
  return request({
    url:'/dj/detail',
    params:{
      rid
    }
  })
}
export function getPrograms(rid,offset,limit){
  return request({
    url:'/dj/program',
    params:{
      rid,
      offset,
      limit
    }
  })
}
export function getSongList(ids){
  return request({
    url:'/song/detail',
    params:{
      ids
    }
  })
}
export function getTodayRecSong(cookie){
  return request({
    withCredentials: true,
    url:'/recommend/songs',
    params:{
      cookie,
      random: Math.random()
    }
  })
}
export function getAlbumnList(id){
  return request({
    url:'/album',
    params:{
      id
    }
  })
}
export function getRecentSong(uid,type,cookie){
  return request({
    url:'/user/record',
    withCredentials: true,
    params:{
      uid,
      type,
      random: Math.random(),
      cookie,
    }
  })
}
export function updataListInfo(id,name,desc,tags,cookie){
  return request({
    url:'/playlist/update',
    params:{
      id,name,desc,tags,cookie,
      random: Math.random()
    }
  })
}
export function subscribe(id,t,cookie){
  return request({
    url:"/playlist/subscribe",
    params:{  
      id,t,cookie,
      random: Math.random()
    }
  })
}
export function SongToMyList(ListId,SongId,op,cookie){
  return request({
    url:"/playlist/tracks",
    params:{
      pid:ListId,
      tracks:SongId,
      op:op,
      cookie:cookie,
      random: Math.random()
    }
  })
}