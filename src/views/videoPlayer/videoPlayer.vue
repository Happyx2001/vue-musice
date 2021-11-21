<!--视频播放界面-->
<template>
  <div id="video-player" ref='videoPlayer'
    v-show="isShowVideoPlayer"
    @click="PlayAndPause"
    v-if="curPlayVideoList.length!=0"
    >
    <play-nav></play-nav>
    <van-swipe
    v-if="curPlayVideo"
    style="height: 100%;"
    class='swipe'
    @change="onChange"
    :show-indicators='false'
    :initial-swipe='curVideoindex'
    ref='swipe'
    :loop='false'
    vertical>
      <van-swipe-item v-for="(item,index) in curPlayVideoList" :key="index">
        <video
        v-if="index==curVideoindex"
        ref="video"
        :src="curPlayVideo.data.urlInfo.url"
        autoplay='autoplay'
        loop='loop'
        @timeupdate="timeProgress"
        @play='startPlay'
        :class="{comment:showComment}">
        </video>
        <img class='pre-video' :src="item.coverUrl" v-else>
        <div class="video-item">
          <div class="playBtn" v-show="!isplaying" :class="{comment:showComment}">
            <img src="~assets/icon/videoPlayer/play.png">
          </div>
          <player-ctrl
          ref="playCtrl"
          :curPlayVideo='curPlayVideo'
          :curProgress='curProgress'
          :curIdot='curIdot'
          @moveProgress='moveProgress'
          @moveProgressEnd='moveProgressEnd'
          @touchProgress='touchProgress'
          @changeMove='changeMove'
          >
          </player-ctrl>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import playNav from 'views/videoPlayer/childcomp/playerNav.vue'
import playerCtrl from 'views/videoPlayer/childcomp/playercCtrl.vue'
import {mapGetters} from 'vuex'
import {getVideoUrl,getVideoDetail,getMvDetail,getMvUrl} from 'network/video'
export default {
  data () {
    return {
      isplaying:false,
      isMove: false,
      curProgress:'',
      curIdot:'',

      curVideoindex:0,
      curPlayVideo:null
    };
  },
  components: {playNav,playerCtrl},
  watch:{
    curPlayVideoList(newArr){
      // 每次切换重置swipe组件的索引，即从零开始
      this.curVideoindex=0
      // 点击视频展示播放界面播放时，让当前播放视频对象为列表第一个
      if(newArr.length!=undefined){
        let obj={}
        Object.assign(obj,newArr[0])
        this.setCurPlayVideo(obj)
      }
      else
        this.curPlayVideo=null
      console.log(this.curPlayVideoList);
    }
  },
  computed:{
    ...mapGetters(['isShowVideoPlayer','curPlayVideoList','showComment']),
    // getItemUrl(){
    //     console.log(this.curPlayVideo);
    //     return this.curPlayVideo.data.urlInfo.url
    // }
  },
  methods: {
    async setCurPlayVideo(obj){
      try {
        if(obj.type==1){
          if(obj.hasOwnProperty('data')){
            const res=await getVideoUrl(obj.data.vid)
            obj.data.urlInfo=res.urls[0]
          }else{
            const videoData=await getVideoDetail(obj.vid)
            const url=await getVideoUrl(obj.vid)
            obj.data=videoData.data
            obj.data.urlInfo=url.urls[0]
          }
        }
        else if(obj.type==0){
          const videoData=await getMvDetail(obj.vid)
          const url=await getMvUrl(obj.vid)
          obj.data=videoData.data
          obj.data.urlInfo=url.data
          console.log(obj);
        }
        else{
          const videoData=await getVideoDetail(obj.vid)
          const url=await getVideoUrl(obj.vid)
          obj.data=videoData.data
          obj.data.urlInfo=url.urls[0]
        }
        this.curPlayVideo=obj
      } catch (error) {
        console.log(error);
      }
    },
    // 上划切换视频，设置当前视频对象和索引
    onChange(index){
      this.curVideoindex=index
      let obj={}
      Object.assign(obj,this.curPlayVideoList[index])
      this.setCurPlayVideo(obj)
      // this.curPlayVideo=this.setCurPlayVideo(this.curPlayVideoList[index])
    },
    startPlay(){
      this.isplaying=true
    },
    PlayAndPause(){
      if(this.isplaying){
        this.$refs.video.pause()
        this.isplaying=false
      }
      else{
        this.$refs.video.play()
        this.isplaying=true
      }
    },
    timeProgress(){
      if (this.isMove) return
      const video=this.$refs.video
      // 这里trycatch是因为有时按下返回键会出现找不到currentTime的bug(明明已经清空了CurPlayVideo的。。。)
      try{
        let cur = (video.currentTime / video.duration) * this.$refs.playCtrl.$refs.progress.offsetWidth
        if(isNaN(cur)){
          this.curProgress = 0 + 'px'
          this.curIdot = 0 + 'px'
        }else{
          this.curProgress = cur + 'px'
          this.curIdot = (cur-13) + 'px'
          if(cur-13<0)
            this.curIdot=0+'px'
          else
            this.curIdot=this.curIdot
        }
      }catch(error){
      }
    },
    changeMove(){
      this.isMove=true
    },
    moveProgress(progress,e){
      // console.log(this.isMove);
      if(this.isMove){
        const curWidth= (e.touches[0].clientX - progress.offsetLeft)
        this.curProgress=curWidth - 5 +'px'
        this.curIdot=curWidth - 5 + 'px'
      }
    },
    moveProgressEnd(progress,e){
      this.isMove=false
      const curTime=(e.changedTouches[0].clientX) * this.$refs.video.duration / progress.offsetWidth
      this.$refs.video.currentTime=curTime
    },
    touchProgress(progress,e){
      const curTime= (e.clientX - progress.offsetLeft) * this.$refs.video.duration / progress.offsetWidth
      this.$refs.video.currentTime=curTime
    }
  },
}

</script>
<style lang='less' scoped>
#video-player{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 1);
  z-index: 999;
  video{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all .3s;
    &.comment{
      height: 40%;
    }
  }
  .pre-video{
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    left: 0;
    width: 100%;
    object-fit: cover;
  }
  .playBtn{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all .3s;
    &.comment{
      top: 20%;
    }
    img{
      width: 50px;
    }
  }

  .van-swipe{
    top: -50px;
    left: 0;
    width: 100%
  }
}
</style>