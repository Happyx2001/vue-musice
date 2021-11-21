<!--音乐播放器-->
<template>
  <div id="player" v-show='isShowPlayer'>
    <img class='bg' :src="curPlayMusic.picUrl" v-if='curPlayMusic.picUrl'>
    <img class='bg' :src="curPlayMusic.al.picUrl" v-else-if='curPlayMusic.al'>
    <img class='bg' :src="curPlayMusic.coverUrl" v-else-if="curPlayMusic.radio">
    <img class='bg' :src="curPlayMusic.album.picUrl" v-else-if="curPlayMusic.type=='FM'">
    <audio
    autoplay="autoplay"
    id="music"
    ref="audio"
    :src="Object.keys(curPlayMusic).length!=0 ? curPlayMusic.data[0].url: null"
    @timeupdate="timeProgress"
    @play="startPlay"
    @ended="ended">
    </audio>
    <div class="player-wrap">
      <player-nav :songObject='curPlayMusic'></player-nav>
      <player-panel :songObject='curPlayMusic' :currentTime='currentTime' @showCommentList='showCommentList'></player-panel>
      <player-ctrl
      :currentTime='currentTime'
      :allTime='allTime'
      :curProgress='curProgress'
      :curIdot='curIdot'
      :mode='mode'
      ref="playCtrl"
      @play="play"
      @pause='pause'
      @showPlayList='showPlayList'
      @nextMusic='nextMusic'
      @prevMusic='prevMusic'
      @changeMode='changeMode'
      @changeMove='changeMove'
      @moveProgress='moveProgress'
      @moveProgressEnd='moveProgressEnd'
      @touchProgress='touchProgress'
      @showCommentList='showCommentList'>
      </player-ctrl>
      <play-list></play-list>
    </div>
  </div>
  
</template>

<script>
import playerNav from 'views/player/ChildComp/playerNav'
import PlayerPanel from 'views/player/ChildComp/playerPanel1';
import playerCtrl from 'views/player/ChildComp/playerCtrl'
import playList from 'views/player/ChildComp/playList'

import {mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  name:'player',
  data () {
    return {
      // 是否移动进度条
      isMove: false,
      // 当前时长和总时长
      currentTime:0,
      allTime:0,
      // 进度条位置
      curProgress:0,
      curIdot:0,
      mode:1,//播放模式，1-顺序，2-随机，3-循环
      // 切换歌词面板
    };
  },
  computed:{
    ...mapGetters(
      ['playing',
      'curPlayMusic',
      'isShowPlayer',
      'isShowPlayList',
      'curPlayMusicIndex',
      'curPlayMusicList',
      'curCommentObj'
    ])
  },
  components: {playerNav,PlayerPanel,playerCtrl,playList},
  watch:{
    curPlayMusic(newObj){
      if(newObj.data[0].url==null){
        this.$toast.fail({
            message: '该歌曲可能已下架',
            forbidClick: true,
        })
        setTimeout(() => {
          this.nextMusic()
        }, 3000);
      }
    },
    playing(newBol){
      if(!newBol)
        this.$refs.audio.pause()
    }
  },

  methods: {
    ...mapActions(['setCurPlayMusic','getPersonerFM']),
    ...mapMutations(['updatePlaying','updateIsShowPlayList']),
    // 歌曲开始播放
    startPlay(){
      this.updatePlaying(true)
    },
    // 歌曲播放结束
    ended(){
      this.updatePlaying(false)
      this.nextMusic()
    },
    // 监听歌曲播放时间，audio中自带
    timeProgress(){
      if (this.isMove) return
      const audioid = this.$refs.audio
      this.currentTime = audioid.currentTime
      this.allTime = audioid.duration
      let cur = (audioid.currentTime / audioid.duration) * this.$refs.playCtrl.$refs.progress.offsetWidth
      this.curProgress = cur + 'px'
      this.curIdot = (cur-13) + 'px'
      if(cur-13<0)
        this.curIdot=0
      else
        this.curIdot=this.curIdot
    },
    // 播放
    play(){
      this.$refs.audio.play()
      this.updatePlaying(true)
    },
    // 暂停
    pause(){
      this.$refs.audio.pause()
      this.updatePlaying(false)
    },
    // 切换播放列表
    showPlayList(){
      this.updateIsShowPlayList(true)
    },
    // 下一曲
    nextMusic(click){
      if(this.curPlayMusic.type=='FM'){
        const curMusicListLength=this.curPlayMusicList.length
        if(this.curPlayMusicIndex>=curMusicListLength)
          this.getPersonerFM()
        else
          this.setCurPlayMusic(this.curPlayMusicList[this.curPlayMusicIndex])
      }else{
        // 引入click的目的是当mode为单曲循环时，点下一首会跳到下一首歌
        click=click==undefined ? false : click
        if(this.mode===1 || (this.mode===3 && click)){
          if(this.curPlayMusicIndex<this.curPlayMusicList.length)
            this.setCurPlayMusic(this.curPlayMusicList[this.curPlayMusicIndex])
          else
            this.setCurPlayMusic(this.curPlayMusicList[0])
        }else if(this.mode===2){
          const length=this.curPlayMusicList.length
          let randId=0
          do {
            randId = Math.round(Math.random() * length)
          } while (randId === this.curPlayMusicIndex)
          this.setCurPlayMusic(this.curPlayMusicList[randId])
          console.log(randId);
        }else{
          console.log('单曲循环');
          this.play()
        }
      }
    },
    // 上一曲
    prevMusic(){
      if(this.curPlayMusicIndex-2<0)
        this.setCurPlayMusic(this.curPlayMusicList[this.curPlayMusicList.length-1])
      else
        this.setCurPlayMusic(this.curPlayMusicList[this.curPlayMusicIndex-2])
    },
    // 切换模式
    changeMode(){
      console.log(this.mode);
      this.mode=this.mode+1
      if(this.mode==4)
        this.mode=1
      if(this.mode==1)
        this.$toast('顺序播放')
      else if(this.mode==2)
        this.$toast('随机播放')
      else
        this.$toast('单曲循环')
    },
    // 拖动开始改变isMove
    changeMove(){
      this.isMove=true
      // console.log(this.isMove);
    },
    // 拖动过程改变进度条
    moveProgress(progress,e){
      if(this.isMove){
        const curWidth= (e.touches[0].clientX - progress.offsetLeft)
        this.curProgress=curWidth - 5 +'px'
        this.curIdot=curWidth - 5 + 'px'
      }
    },
    // 拖动结束改变歌曲时间
    moveProgressEnd(progress,e){
      this.isMove=false
      const curTime=(e.changedTouches[0].clientX - progress.offsetLeft) * this.allTime / progress.offsetWidth
      this.$refs.audio.currentTime=curTime
    },
    // 直接点击进度条改变进度
    touchProgress(progress,e){
      const curTime= (e.clientX - progress.offsetLeft) * this.allTime / progress.offsetWidth
      this.$refs.audio.currentTime=curTime
    },
    showCommentList(type){
      let obj={}
      if(type=='media'){
        obj={
          id:this.curPlayMusic.id,
          type:4,
          curMedia:this.curPlayMusic
        }
      }else{
        obj={
          id:this.curPlayMusic.id ? this.curPlayMusic.id:this.curPlayMusic.songId,
          type:0,
          curMusic:this.curPlayMusic
        }
      }
      this.$store.commit('updataCurCommentObj',obj)
      this.$store.commit('updataShowComment',true)
    }
  }
}

</script>
<style lang='less' scoped>
#player{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(169,169,169,1);
  // background: url('~assets/icon/player/bg.jpg');
  z-index: 999;
  .bg{
    filter: blur(80px);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }
}
</style>