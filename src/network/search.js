import {request} from './request'

export function getHotSearchDetail(){
  return request({
    url:"/search/hot/detail"
  })
}
export function getSearchDetail(keywords,type,limit){
  return request({
    url:'/cloudsearch',
    params:{
      keywords,
      type,
      limit
    }
  })
}
export function getDefaulWord(){
  return request({
    url:'/search/default'
  })
}