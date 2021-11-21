import {request} from './request'

export function getCommentText(id,type,pageNo,pageSize,sortType,cursor){
  return request({
    url:'/comment/new',
    params:{
      id,
      type,
      pageNo,
      pageSize,
      sortType,
      cursor
    }
  })
}

export function getSongComment(id,limit,offset,before){
  return request({
    url:"/comment/music",
    params:{
      id,limit,offset,before
    }
  })
}