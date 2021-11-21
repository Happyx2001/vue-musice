<!--发现-->
<template>
  <div id="find">
    <findnav></findnav>
    <scroll
      :probe-type="3"
      :pull-up-load='true'
      @pullingUp='refrash'
      ref="scroll">
      <banner :img='banners' ref="banner"></banner>
      <content-nav :icon='content_nav'></content-nav>
      <recomment-list :recommendList='recommendPlayList' ref="recList" @buttonActive='toAllSongList'></recomment-list>
      <rec-style :songStyle='recStyleSong'></rec-style>
      <rec-video :recVideoList='recVideo' ref="recVideo"></rec-video>
      <rec-media :recMediaList='recMedia' ref="recMedia"></rec-media>
      <new-data :recData='showNewData' @tabClick='tabClick'></new-data>
      <hot-singer :singerList='singerList' ref="hotSinger"></hot-singer>
    </scroll>
  </div>
</template>

<script>
import scroll from 'components/common/scroll/scroll.vue'
import findnav from 'views/find/childComp/findNav'
import banner from 'views/find/childComp/banner'
import contentNav from 'views/find/childComp/contentNav'
import RecommentList from 'views/find/childComp/recommentList'
import newData from 'views/find/childComp/newData'
import hotSinger from 'views/find/childComp/hotsinger'
import recVideo from 'views/find/childComp/recVideo.vue'
import recMedia from 'views/find/childComp/recMedia.vue'
import recStyle from 'views/find/childComp/recStyleSong.vue'

import {getBall,getFind,getRecNewSong,getHotSinger,getNewAlbumn} from 'network/find'
import {mapGetters} from 'vuex'
export default {
  name:'find',
  data () {
    return {
      // 这个我也不知道有什么用，首页数据上可以带上这个参数
      curson:{},

      // 轮播图片
      banners:[],
      // 内容导航（圆角标签部分）
      content_nav:[],
      // 推荐歌单
      recommendPlayList:[],
      // 推荐视频
      recVideo:[],
      // 推荐播单
      recMedia:[],
      recStyleSong:{},
      //推荐数据，分为新歌，新碟
      recData:{
        'newSong':{type:'newSong',list:[]},
        'newAlbumn':{type:'newAlbumn',list:[]},
      },
      currentType:'newSong',
      // 热门歌手
      singerList:[]
    };
  },
  created() {
    this.getFindInfo(true)
    this.getBall()
    this.getRecNewSong(9)
    this.getNewAlbumn()
    this.getHotSinger(10)
  },
  watch:{
    hasLogin(){
      this.getFindInfo(true)
      // this.getRecommendPlayList()
    }
  },
  computed:{
    ...mapGetters(['hasLogin']),
    showNewData(){
      return this.recData[this.currentType]
    }
  },
  components: {
    scroll,
    findnav,
    banner,
    contentNav,
    RecommentList,
    newData,
    hotSinger,
    recVideo,
    recMedia,
    recStyle
  },
  methods: {
    async getFindInfo(isRefresh,cursor){
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration:0
      })
      try {
        const cookie=localStorage.getItem('cookie')
        const res=await getFind(isRefresh,cursor,cookie)
        const data=res.data.blocks
        this.cursor=res.data.cursor
        // console.log(this.cursor);
        console.log(data);
        data.forEach(element => {
          if(element.blockCode=="HOMEPAGE_BANNER")
            this.banners=element.extInfo.banners
          else if(element.blockCode=="HOMEPAGE_BLOCK_PLAYLIST_RCMD")
            this.recommendPlayList=element.creatives
          else if(element.blockCode=="HOMEPAGE_MUSIC_MLOG")
            this.recVideo=element.extInfo
          else if(element.blockCode=="HOMEPAGE_VOICELIST_RCMD")
            this.recMedia=element.creatives
          else if(element.blockCode=='HOMEPAGE_BLOCK_STYLE_RCMD'){
            this.recStyleSong=element
          }
            // this.recMedia=element.creatives
        });
        this.$toast.clear()
      } catch (error) {
        console.log(error);
      }
    },
    // 获取首页圆形图标
    getBall(){
      getBall().then(res=>{
        this.content_nav=res.data
      })
    },
    // 获取新歌
    getRecNewSong(count){
      getRecNewSong(count).then(res=>{
        // console.log(res);
        // this.recData.type='recNewSong'
        this.recData['newSong'].list=res.result
      })
    },
    // 获取新碟
    getNewAlbumn(){
      getNewAlbumn().then(res=>{
        // this.recData.type='recNewAlbumn'
        // this.recData.list=res.albums
        this.recData['newAlbumn'].list=res.albums
      })
    },
    // 获取热门歌手
    getHotSinger(limit){
      getHotSinger(limit).then(res=>{
        this.singerList=res.artists
        // console.log(res);
      })
    },
    // 去所有歌单界面
    toAllSongList(){
      this.$router.push({
        path:'/allSongList'
      })
    },
    // 上拉刷新数据
    refrash(){
      this.getFindInfo(true)
      this.$refs.scroll.finishPullUp()
    },
    // 切换新歌、新碟数据
    tabClick(index){
      switch(index){
        case 0:{
          this.currentType='newSong'
        }
        break;
        case 1:{
          this.currentType='newAlbumn'
        }
        break;
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>{
      vm.$store.commit('setTabBarShow',true)
      // 每次切换路由重新渲染banner
      vm.$refs.banner.reRender=false
      setTimeout(()=>{
        vm.$refs.banner.reRender=true
      },0)
      
      if(vm.recommendPlayList.length!==0){
        this.$nextTick(()=>{
          vm.$refs.recList.$refs.rowScroll.refresh()
        })
      }
      if(vm.recVideo.length!==0){
        this.$nextTick(()=>{
          vm.$refs.recVideo.$refs.rowScroll.refresh()
        })
      }
      if(vm.recMedia.length!==0){
        this.$nextTick(()=>{
          vm.$refs.recMedia.$refs.rowScroll.refresh()
        })
      }
      if(vm.singerList.length!==0){
        this.$nextTick(()=>{
          vm.$refs.hotSinger.$refs.rowScroll.refresh()
        })
      }
    })
  }
}

</script>
<style lang='less' scoped>
</style>