import {request} from './request'

export function getVideoSpecies(){
  return request({
    url:'/video/group/list'
  })
}

export function getVideoDetail(id){
  return request({
    url:'/video/detail',
    params:{
      id
    }
  })
}

export function getVideo(id,offset,cookie){
  return request({
    url:'/video/group',
    // withCredentials: true,
    params:{
      id,
      offset,
      cookie,
      random: Math.random()
    }
  })
}

export function getVideoUrl(id){
  return request({
    url:'/video/url',
    params:{
      id
    }
  })
}

export function MlogToVideo(id){
  return request({
    url:'/mlog/to/video',
    params:{
      id
    }
  })
}

export function getRecVideo(offset,cookie){
  return request({
    withCredentials: true,
    url:'/video/timeline/recommend',
    params:{
      offset,
      cookie,
      random: Math.random()
    }
  })
}

export function getRelatedVideo(id,cookie){
  return request({
    url:'/related/allvideo',
    params:{
      id,
      cookie,
      random: Math.random()
    }
  })
}

export function getMvDetail(mvid){
  return request({
    url:'/mv/detail',
    params:{
      mvid
    }
  })
}

export function getMvUrl(id){
  return request({
    url:'/mv/url',
    params:{
      id
    }
  })
}