import { createStore } from 'vuex'
import {Toast} from 'vant'

import {getLoginStatus,getPurchasedSong,getUserSongList,getUserAccount} from 'network/login'

import {getMusicUrl,getLyric} from 'network/player'
import {getVideoUrl,MlogToVideo,getVideoDetail,getRecVideo,getRelatedVideo,getMvDetail,getMvUrl} from 'network/video'

import {getPersonerFM} from 'network/find'


import {getSongListInfo} from 'network/songlistdetail'

// 播客页面的store
const media={
  state:{
    RouterType:'recommend'
  },
  mutations:{
    setRouterType(state,string){
      state.RouterType=string
    }
  },
  getters:{
    RouterType:state=>state.RouterType
  }
}
// 用户的stor,用于共享登录信息,比如实现实时更新啥的
const user={
  state:{
    userAccount:{},
    havePurchasedSong:[],
    userLikeSong:[],
    userAddList:[],
    userCollectList:[],
    hasLogin:false
  },
  mutations:{
    setHasLogin(state,bol){
      state.hasLogin=bol
    },
    setUserAccount(state,obj){
      state.userAccount=obj
    },
    setUserLikeSong(state,arr){
      state.userLikeSong=arr
    },
    setHavePurchasedSong(state,arr){
      state.havePurchasedSong=arr
    },
    setUserAddList(state,arr){
      state.userAddList=arr
    },
    setUserCollectList(state,arr){
      state.userCollectList=arr
    }
  },
  actions:{
    async setUserInfo({commit}){
      try {
        const cookie=localStorage.getItem('cookie')
        console.log(cookie);
        const res=await getLoginStatus(cookie);
        if(res.data.account || res.data.profile){
          const uid=localStorage.getItem('uid')
          // 设置是否登录
          commit('setHasLogin',true)

          Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration:0
          })
          // 获取用户头像等大概信息
          const user=await getUserAccount(cookie)
          commit('setUserAccount',user)

          // 获取已购歌曲
          const purchasedSong=await getPurchasedSong(cookie)
          commit('setHavePurchasedSong',purchasedSong.data.list)

          // 获取用户歌单,并拆分喜欢和收藏歌单
          const userSongList=await getUserSongList(uid,cookie)
          let UserAddList=[]
          let UserCollectList=[]
          userSongList.playlist.forEach(element => {
            if(element.userId==uid)
              UserAddList.push(element)
            else
              UserCollectList.push(element)
          });
          const res=await getSongListInfo(UserAddList[0].id,cookie)
          commit('setUserLikeSong',res.playlist.trackIds)
          commit('setUserAddList',UserAddList)
          commit('setUserCollectList',UserCollectList)
        }else{
          // 退出登录重置store
          commit('setHasLogin',false)
          commit('setUserAccount',{}),
          commit('setHavePurchasedSong',[]),
          commit('setUserAddList',[]),
          commit('setUserCollectList',[])
        }
        Toast.clear()
      } catch (error) {
        Toast.fail({
          message: '请求数据失败',
          forbidClick: true,
          duration:2000
        })
        console.log(error);
      }
    }
  },
  getters:{
    userAccount:state=>state.userAccount,
    havePurchasedSong:state => state.havePurchasedSong,
    userLikeSong:state => state.userLikeSong,
    userAddList:state => state.userAddList,
    userCollectList:state => state.userCollectList,
    hasLogin:state => state.hasLogin
  }
}
export default createStore({
  state: {
    // 动态显示底部导航栏
    tabBarShow: true,
    // 是否在播放
    playing: false,
    // 当前正在播放的音乐对象
    curPlayMusic: {},
    // 当前播放视频列表
    curPlayVideoList:[],
    // 当前歌单
    curPlayMusicList:{},
    // 当前正在播放音乐的索引
    curPlayMusicIndex:0,
    // 是否展示音乐播放器
    isShowPlayer:false,
    isShowPlayerNav:false,

    // 是否展示播放列表
    isShowPlayList:false,
    // 是否展示视频播放器
    isShowVideoPlayer:false,
    // 是否展示评论界面
    showComment:false,
    curCommentObj:{}
  },
  mutations: {
    // 动态显示底部导航栏
    setTabBarShow(state,bool){
      state.tabBarShow=bool
    },
    // 更新当前播放音乐对象
    updateCurPlayMusic(state,obj){
      state.curPlayMusic=obj
    },

    // 更新播放状态
    updatePlaying(state,bol){
      state.playing=bol
    },
    // 更新是否展示播放器
    updateShowPlayer(state,bol){
      state.isShowPlayer=bol
    },
    // 是否展示mini播放器
    updateShowPlayerNav(state,bol){
      state.isShowPlayerNav=bol
    },
    // 设置当前播放音乐列表
    updateCurPlayMusicList(state,arr){
      state.curPlayMusicList=arr
    },
    // 设置当前播放音乐索引
    updateCurPlayMusicIndex(state,num){
      state.curPlayMusicIndex=num
    },
    // 是否展示音乐列表
    updateIsShowPlayList(state,bol){
      state.isShowPlayList=bol
    },
    // 设置当前播放视频列表
    updataCurPlayVideoList(state,arr){
      state.curPlayVideoList=arr
    },
    // 是否展示视频播放器
    updateisShowVideoPlayer(state,bol){
      state.isShowVideoPlayer=bol
    },
    updataShowComment(state,bol){
      state.showComment=bol
    },
    updataCurCommentObj(state,obj){
      state.curCommentObj=obj
    }
  },
  actions: {
    // async setLoginStatus({ commit }) {
    //   try {
    //     // console.log(localStorage.getItem('cookie'));
    //     const res=await getLoginStatus();
    //     console.log(res);
    //     if(res.data.account || res.data.profile){
    //       commit('updateLoginStatus', true);
    //     }else{
    //       commit('updateLoginStatus', false);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    async setCurPlayMusic({commit},obj){
      try {
        const cookie=localStorage.getItem('cookie')
        let res={}
        // 这里做判断是判断当前播放的音乐对象是否是电台，如果不是电台就获取歌词
        if(obj.mainSong)
           res=await getMusicUrl(obj.mainSong.id,cookie)
        else{
          res=await getMusicUrl(obj.id?obj.id:obj.songId,cookie)
          const lyric=await getLyric(obj.id?obj.id:obj.songId,cookie)
          obj.lyric=lyric
        }
        obj.data=res.data
        console.log(obj);
        commit('updateCurPlayMusic',obj)
      } catch (error) {
        console.log(error);
      }
    },
    // async setcurPlayVideo({dispatch,commit},obj){
    //   try {
    //     if(obj.hasOwnProperty('data')){
    //       const res=await getVideoUrl(obj.data.vid)
    //       obj.data.urls=res.urls
    //     }else if(obj.alg='alg_search_precision_video_tab_basic'){
    //       const res=await getVideoDetail(obj.vid)
    //       const url=await getVideoUrl(obj.vid)
    //       obj.data=res.data
    //       obj.data.urls=url.urls[0].url
    //       console.log(obj);
    //     }else{
    //       const res=await getMlogUrl(obj.id)
    //       obj.data=res.data.resource
    //     }
    //     commit('updataCurPlayVideo',obj)

    //     dispatch('setcurPlayVideoList')
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async setcurPlayVideoList({commit},obj){
      try {
        if(obj.type==2){
          const VideoVid=await MlogToVideo(obj.id)
          obj.vid=VideoVid.data
        }
        // 这里先获取当前点击的视频对象信息
        // if(obj.type==1){
        //   if(obj.hasOwnProperty('data')){
        //     const res=await getVideoUrl(obj.data.vid)
        //     obj.data.urlInfo=res.urls[0]
        //   }else{
        //     const videoData=await getVideoDetail(obj.vid)
        //     const url=await getVideoUrl(obj.vid)
        //     obj.data=videoData.data
        //     obj.data.urlInfo=url.urls[0]
        //   }
        // }
        // else if(obj.type==0){
        //   const videoData=await getMvDetail(obj.vid)
        //   const url=await getMvUrl(obj.vid)
        //   obj.data=videoData.data
        //   obj.data.urlInfo=url.data
        //   console.log(obj);
        // }
        // else{
        //   const res=await MlogToVideo(obj.id)
        //   const videoData=await getVideoDetail(res.data)
        //   const url=await getVideoUrl(res.data)
        //   obj.data=videoData.data
        //   obj.data.urlInfo=url.urls[0]
        // }
        
        // 获取相关视频
        const cookie=localStorage.getItem('cookie')
        const res= await getRelatedVideo(obj.data?obj.data.vid:obj.vid,cookie)

        // 这里对相关视频的类型做拦截
        res.data.forEach((element,index) => {
          if(element.type==7){
            res.data.splice(index,1)
          }
        });
        // 这里将当前点击视频对象添加进视频列表
        res.data.unshift(obj)
        commit('updataCurPlayVideoList',res.data)
      } catch (error) {
        console.log(error);
        // if(error.code==301){
        //   Toast.fail({
        //     message: '请先登录！',
        //     forbidClick: true,
        //   })
        // }
      }
    },
    // 私人FM
    async getPersonerFM({dispatch,commit}){
      try {
        const res=await getPersonerFM()
        const FMdata=res.data
        FMdata.forEach(el => {
          el.type='FM'
        });
        dispatch('setCurPlayMusic',FMdata[0])
        commit('updateCurPlayMusicList',FMdata)
        console.log(FMdata);
      } catch (error) {
        console.log(error);
      }
    },
    showPlayer({commit},bol){
      commit('updateShowPlayer',bol)
      if(bol)
        commit('updateShowPlayerNav',false)
      else
        commit('updateShowPlayerNav',true)
    },
    ShowVideoPlayer({commit},bol){
      commit('updateisShowVideoPlayer',bol)
      if(bol){
        // 隐藏mini音乐播放器
        commit('updateShowPlayerNav',false)
        // 暂停歌曲播放
        commit('updatePlaying',false)
      }
      // 隐藏视频播放器时重置当前播放视频为空对象
      else
        commit('updataCurPlayVideoList',{})
    }
  },
  getters:{
    tabBarShow: state => state.tabBarShow,
    playing:state=>state.playing,
    curPlayMusic:state => state.curPlayMusic,
    curPlayMusicList:state => state.curPlayMusicList,
    isShowPlayer:state => state.isShowPlayer,
    isShowPlayerNav :state=>state.isShowPlayerNav,
    isShowPlayList:state =>state.isShowPlayList,
    curPlayMusicIndex:state=>state.curPlayMusicIndex,
    isShowVideoPlayer:state=>state.isShowVideoPlayer,
    curPlayVideoList:state => state.curPlayVideoList,
    showComment:state => state.showComment,
    curCommentObj:state => state.curCommentObj
  },
  modules: {
    media:media,
    userInfo:user
  }
})
