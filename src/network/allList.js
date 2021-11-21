import {request} from './request'

export function getCategory(){
  return request({
    url:'/playlist/catlist'
  })
}

export function getList(cat,limit,offset,order){
  return request({
    url:"/top/playlist",
    params:{
      cat,
      limit,
      offset,
      order
    }
  })
}