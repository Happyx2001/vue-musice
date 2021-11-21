<!--操作组件-->
<template>
  <div class="player-ctrl">
    <div class="progress">
      <span>{{fomatCurrentTime}}</span>
      <div class="progress-bar"
      ref="progress"
      @touchmove='moveProgress'
      @touchend.stop="moveProgressEnd"
      @click.stop='touchProgress'>
        <div class="cur-progress" :style="`width:${curProgress}`"></div>
        <div class="idot" :style="`left:${curIdot}`" @touchstart.stop='changeMove'></div>
      </div>
      <span>{{fomatAllTime}}</span>
    </div>

    <div class="player-conctrl" v-if="curPlayMusic.type=='FM'">
      <div class="unlike">
        <img src="~assets/icon/player/unlike.png">
      </div>
      <div class="like" @click.stop="like">
        <img src="~assets/icon/player/like_fill.png" v-if="curMusicIsMyLike(curPlayMusic,userLikeSong)">
        <img src="~assets/icon/player/like.png" v-else>
      </div>
      <div class="ctrl">
        <img src="~assets/icon/player/play.png" v-if="playing" @click.stop="pause">
        <img src="~assets/icon/player/pause.png" v-else @click="play">
      </div>
      <div class="next" @click.stop="nextMusic">
        <img src="~assets/icon/player/next.png">
      </div>
      <div class="comment" @click.stop="showCommentList">
        <img src="~assets/icon/player/comment.png">
      </div>
    </div>
    <div class="player-conctrl" v-else>
      <div class="play-mode" @click="changeMode">
        <img src="~assets/icon/player/listcycle.png" v-show="mode==1">
        <img src="~assets/icon/player/randomplay.png" v-show="mode==2">
        <img src="~assets/icon/player/cycle.png" v-show="mode==3">
      </div>
      <div class="prev" @click="prevMusic">
        <img src="~assets/icon/player/prev.png">
      </div>
      <div class="ctrl">
        <img src="~assets/icon/player/play.png" v-if="playing" @click="pause">
        <img src="~assets/icon/player/pause.png" v-else @click="play">
      </div>
      <div class="next" @click="nextMusic">
        <img src="~assets/icon/player/next.png">
      </div>
      <div class="play-list-btn" @click="showPlayList">
        <img src="~assets/icon/player/playlist.png">
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

import {SongToMyList} from 'network/songlistdetail'
export default {
  name: "playerCtrl",
  props:['currentTime','allTime','curProgress','curIdot','mode'],
  data() {
    return {
      click:true
    };
  },
  computed:{
    ...mapGetters(['playing','curPlayMusic','userAddList','userLikeSong']),
    fomatCurrentTime(){
        let min = parseInt(this.$props.currentTime / 60)
        let sec = parseInt(this.$props.currentTime % 60)
        min = min < 10 ? '0' + min : min
        sec = sec < 10 ? '0' + sec : sec
        return min + ':' + sec
    },
    fomatAllTime(){
        let min = parseInt(this.$props.allTime / 60)
        let sec = parseInt(this.$props.allTime % 60)
        min = min < 10 ? '0' + min : min
        sec = sec < 10 ? '0' + sec : sec
        return min + ':' + sec
    }
  },
  methods: {
    ...mapActions(['setUserInfo']),
    play(){
      this.$emit('play')
    },
    pause(){
      this.$emit('pause')
    },
    showPlayList(){
      this.$emit('showPlayList')
    },
    nextMusic(){
      this.$emit('nextMusic',this.click)
    },
    prevMusic(){
      this.$emit('prevMusic')
    },
    changeMode(){
      this.$emit('changeMode')
    },
    changeMove(){
      this.$emit('changeMove')
    },
    moveProgress(e){
      this.$emit('moveProgress',this.$refs.progress,e)
    },
    moveProgressEnd(e){
      this.$emit('moveProgressEnd',this.$refs.progress,e)
    },
    touchProgress(e){
      this.$emit('touchProgress',this.$refs.progress,e)
    },
    showCommentList(){
      this.$emit('showCommentList')
    },
    
    curMusicIsMyLike(curMusic,MyLikeSong){
      let flag=false
      for(let i=0;i<MyLikeSong.length;i++){
        if(curMusic.id==MyLikeSong[i].id){
          flag=true
          break;
        }
      }
      return flag
    },
    async like(){
      const cookie=localStorage.getItem('cookie')
      let set='add'
      if(this.curMusicIsMyLike(this.curPlayMusic,this.userLikeSong))
        set='del'
      try {
        this.$toast.loading({
          duration: 0,
        });
        const res=await SongToMyList(this.userAddList[0].id,this.curPlayMusic.id,set,cookie)
        await this.setUserInfo()
        if(set=='add'){
          this.$toast.success({
            message: "感谢你的喜欢，爱你哟(*^▽^*)",
            duration: 2000,
          })
        }else{
        this.$toast.success({
          message:"真的要离开我吗o(╥﹏╥)o",
          duration: 2000,
        })
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {},
};
</script>
<style lang='less' scoped>
.player-ctrl {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 120px;
  color: #fff;
  background-color: transparent;
  .progress {
    display: flex;
    align-items: center;
    padding: 0 15px;
    margin-top: 15px;
    .progress-bar{
      flex: 1;
      margin: 0 5px;
      height: 2px;
      background-color: #9f9f9f;
      .cur-progress{
        height: 100%;
        background-color: #fff;
      }
      .idot{
        position: relative;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background-color: #fff;
        top: -7px;
      }
    }
  }

  .player-conctrl{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    margin-top: 20px;
    .play-mode,.play-list-btn{
      width: 25px;
    }
    .prev,.next{
      width: 30px;
    }
    .ctrl{
      width: 40px;
    }

    .unlike,.like{
      width: 30px;
    }
    .comment{
      width: 25px;
    }

    img{
      width: 100%;
    }
  }
}
</style>