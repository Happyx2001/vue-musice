import {request} from './request'
// 分类推荐
export function getRecCategory(){
  return request({
    url:'/dj/category/recommend',
    params:{
      random:Math.random()
    }
  })
}
// 个性推荐
export function getPersonalizeRec(){
  return request({
    url:'/dj/personalize/recommend'
  })
}
// 今日优选
export function getTodayPrefer(){
  return request({
    url:'/dj/today/perfered',
    params:{
      random:Math.random()
    }
  })
}
// 热门电台
export function getHotMedia(limit,offset){
  return request({
    url:'/dj/hot',
    params:{
      limit,
      offset,
      random:Math.random()
    }
  })
}
// 推荐节目
export function getRecPrograms(){
  return request({
    url:'/program/recommend'
  })
}
// 获取电台详情
export function getProgram(rid){
  return request({
    url:"/dj/program",
    params:{
      rid
    }
  })
}