<!--云村-->
<template>
  <div id="communicate">
    <video-nav></video-nav>
    <video-species :species='videoTag' @itemClick='navClick' @moreClick='moreClick' ref="VideoSpecies"></video-species>
    <scroll
    :probe-type="3"
    :pull-up-load='true'
    :pull-down='true'
    @pullingUp='loadMore'
    @pullingDown='ToSort'
    @FindScrollPosition='ContentScroll'
    class="scroll"
    ref="scroll">
      <video-list :videoInfo='videoInfo.list'></video-list>
    </scroll>
    <backtop @click="backClick" v-show="isShowBackTop"></backtop>
    <van-overlay :show="show" @click="overLayClick" />
  </div>
</template>

<script>
import backtop from 'components/common/backTop/backTop.vue'
import scroll from 'components/common/scroll/scroll.vue'
import videoNav from 'views/communicate/childComp/videoNav'
import VideoSpecies  from 'views/communicate/childComp/VideoSpecies'
import videoList from 'views/communicate/childComp/videoList.vue'
import {getVideoSpecies,getVideo} from 'network/video'
import {compare} from 'utils/index'
import {mapGetters,mapMutations} from 'vuex'
export default {
  name:'communicate',
  data () {
    return {
      videoTag:[],

      videoInfo:{
        page:0,
        list:[]
        },

      // 加载更多使用
      currentClickId:0,

      isShowBackTop:false,

      show:false
    };
  },
  created() {
    this.getVideoSpecies()
  },
  watch:{
    hasLogin(bol){
      if(bol){
        this.$nextTick(()=>{
          this.navClick(this.videoTag[0].id)
        })
      }
      else{
        this.$nextTick(()=>{
          this.videoInfo.list=[]
        })
      }
    },
    isShowPlayer(bol){
      // console.log(bol);
      if(bol)
        this.isShowBackTop=false
    },
    isShowVideoPlayer(bol){
      if(bol)
        this.isShowBackTop=false
    }
  },
  computed:{
    ...mapGetters(['isShowPlayer','isShowVideoPlayer','hasLogin'])
  },
  components: {scroll,backtop,videoNav,VideoSpecies,videoList},
  methods: {
    ...mapMutations(['updataCurPlayVideoList']),
    // 获取全部类型
    async getVideoSpecies(){
      try {
        const res=await getVideoSpecies()
        this.videoTag=res.data
        this.currentClickId=this.videoTag[0].id

        this.navClick(this.videoTag[0].id)
      } catch (error) {
        console.log(error);
      }
    },
    // 切换类型
    async navClick(id){
      this.show=false
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration:0
      })
      if(id!==this.currentClickId){
        // 如果切换了类型，重置page
        this.videoInfo.page=0
        // 切换类型返回顶部
        this.$refs.scroll.scrollTo(0,0,500)
      }
      const page=this.videoInfo.page
      try {
        const cookie=localStorage.getItem('cookie')
        const res=await getVideo(id,page,cookie)
        // 未切换类型时每次执行该方法都会使page+1
        this.videoInfo.page++
        // 上拉加载情况，拼接新请求到的数据
        if(id==this.currentClickId)
          this.videoInfo.list=this.videoInfo.list.concat(res.datas)
        else
          this.videoInfo.list=res.datas
        // this.updataCurPlayVideoList(this.videoInfo.list)
        this.currentClickId=id
        this.$toast.clear()
        // console.log(this.videoInfo);
      } catch (error) {
        if(error.code==301){
          this.$toast.fail({
            message: '请先登录！',
            forbidClick: true,
          })
          this.$router.push({
            path:'/login',
          })
        }
        else if(error.code==-448){
          this.$toast.fail({
            message: '服务器繁忙，请稍后再试！',
            forbidClick: true,
          })
        }
        console.log(error);
      }
    },
    // 加载更多
    loadMore(){
      this.navClick(this.currentClickId)
      this.$refs.scroll.finishPullUp()
    },
    // 下拉排序
    ToSort(){
      this.videoInfo.list=this.videoInfo.list.sort(compare('data','praisedCount'),true)
      this.$refs.scroll.finishPullDown()
    },
    // 点击导航栏右侧更多按钮弹出遮罩层
    moreClick(){
      this.show=!this.show
    },
    // 点击遮罩层
    overLayClick(){
      this.show=false
      this.$refs.VideoSpecies.showMore=false
    },
    // 处理滚动事件，动态展示返回顶部按钮
    ContentScroll(position){
      this.isShowBackTop=position.y<-1000
    },
    // 回到顶部
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
  },
  activated() {
    this.$refs.scroll.refresh()
  },
}

</script>
<style lang='less' scoped>
.scroll{
  top:89px;
}
.van-overlay{
  z-index: 0;
}
</style>