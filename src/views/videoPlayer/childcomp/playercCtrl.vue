<!--操作栏-->
<template>
  <div class="play-ctrl" v-if="curPlayVideo.hasOwnProperty('data')">
    <div class="video-info" v-if="curPlayVideo.data.hasOwnProperty('creator')">
      <div class="left">
        <div class="user-info">
          <img :src="curPlayVideo.data.creator.avatarUrl">
          <span>{{curPlayVideo.data.creator.nickname}}</span>
        </div>
        <div class="description">{{curPlayVideo.data.description}}</div>
      </div>
      <div class="right">
        <div class="item"  @click.stop="praise">
          <img src="~assets/icon/videoPlayer/like.png">
          <span>{{curPlayVideo.data.praisedCount}}</span>
        </div>
        <div class="item" @click.stop="toPageComment">
          <img src="~assets/icon/videoPlayer/comment.png">
          <span>{{curPlayVideo.data.commentCount}}</span>
        </div>
        <div class="item" @click.stop="repeat">
          <img src="~assets/icon/videoPlayer/repeat.png">
          <span>{{curPlayVideo.data.shareCount}}</span>
        </div>
        <div class="item" @click.stop="collect">
          <img src="~assets/icon/videoPlayer/collect.png">
          <span>收藏</span>
        </div>
      </div>
    </div>
    <div class="video-info" v-else-if="curPlayVideo.data.hasOwnProperty('artists')">
      <div class="left">
        <div class="user-info">
          <img v-if='curPlayVideo.data.artists[0].img1v1Url!==null' :src="curPlayVideo.data.artists[0].img1v1Url">
          <img v-else src='~assets/icon/profile/avatar.svg'>
          <span>{{curPlayVideo.data.artists[0].name}}</span>
        </div>
        <div class="description">{{curPlayVideo.title}}</div>
      </div>
      <div class="right">
        <div class="item" @click.stop="praise">
          <img src="~assets/icon/videoPlayer/like.png">
          <span>{{curPlayVideo.data.subCount}}</span>
        </div>
        <div class="item" @click.stop="toPageComment">
          <img src="~assets/icon/videoPlayer/comment.png">
          <span>{{curPlayVideo.data.commentCount}}</span>
        </div>
        <div class="item" @click.stop="repeat">
          <img src="~assets/icon/videoPlayer/repeat.png">
          <span>{{curPlayVideo.data.shareCount}}</span>
        </div>
        <div class="item" @click.stop="collect">
          <img src="~assets/icon/videoPlayer/collect.png">
          <span>收藏</span>
        </div>
      </div>
    </div>
    
    <div class="progress">
      <div class="progress-bar"
        ref="progress"
        @touchmove='moveProgress'
        @touchend.stop="moveProgressEnd"
        @click.stop='touchProgress'>
        <div class="cur-progress" :style="`width:${curProgress}`"></div>
        <div class="idot" :style="`left:${curIdot}`" @touchstart.stop='changeMove'></div>
      </div>
    </div>

    <navbar class="main-song" v-if="curPlayVideo.data.hasOwnProperty('relateSong') && curPlayVideo.data.relateSong.length!==0">
      <van-nav-bar @click-left="likeMusic">
        <template #left>
          <img class='like-song' src="~assets/icon/videoPlayer/likeSong.png">
        </template>
        <template #title>
          <van-notice-bar scrollable color="#999" background="rgba(0,0,0,0)" left-icon='audio'>
            {{curPlayVideo.data.relateSong[0].name}}
          </van-notice-bar>
        </template>
      </van-nav-bar>
    </navbar>
    <!-- <navbar class="main-song" v-else-if="curPlayVideo.data.hasOwnProperty('content') && curPlayVideo.data.content.relateSongs.length!==0">
      <van-nav-bar @click-left="likeMusic">
        <template #left>
          <img class='like-song' src="~assets/icon/videoPlayer/likeSong.png">
        </template>
        <template #title>
          <van-notice-bar scrollable color="#999" background="rgba(0,0,0,0)" left-icon='audio'>
            {{curPlayVideo.data.content.relateSongs[0].name}}
          </van-notice-bar>
        </template>
      </van-nav-bar>
    </navbar> -->
    <navbar class="main-song" v-else>
      <van-nav-bar>
        <template #title>
          暂无相关歌曲
        </template>
      </van-nav-bar>
    </navbar>
  </div>
</template>

<script>
import navbar from "components/content/navbar/navbar";
import {mapGetters} from 'vuex'
export default {
  name:'playerCtrl',
  props:{
    curPlayVideo:{
      type:Object,
      default(){
        return {}
      }
    },
    curProgress:{
      type:String,
      default:''
    },
    curIdot:{
      type:String,
      default:''
    }
  },
  data () {
    return {
    };
  },
  components:{
    navbar
  },
  methods: {
    // 把视频bgm加入到我喜欢的音乐歌单
    likeMusic(){
    },
    // 点赞视频
    praise(){

    },
    // 去评论界面
    toPageComment(){
      const obj={
        id:this.curPlayVideo.data.vid?this.curPlayVideo.data.vid:this.curPlayVideo.data.id,
        type:this.curPlayVideo.type==0? 1:5,
      }
      console.log(obj);
      this.$store.commit('updataCurCommentObj',obj)
      this.$store.commit('updataShowComment',true)
    },
    // 分享视频
    repeat(){

    },
    // 收藏视频
    collect(){

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
    changeMove(){
      this.$emit('changeMove')
    },
  }
}

</script>
<style lang='less' scoped>
.play-ctrl{
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 260px;
  color: #fff;
  background-color: transparent;
  .video-info{
    height: 200px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 15px;
    .left{
      width: 50%;
      .user-info{
        display: flex;
        align-items: center;
        img{
          width: 40px;
          border-radius: 50%;
        }
        span{
          margin-left: 10px;
          font-size: 14px;
        }
      }
      .description{
        margin-top: 10px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .right{
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .item{
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        img{
          width: 30px;
        }
        span{
          min-height: 15px;
        }
      }
    }
  }
  .progress {
    display: flex;
    align-items: center;
    margin-top: 15px;
    opacity: 0.7;
    .progress-bar{
      flex: 1;
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

  .main-song{
  position: absolute;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  /deep/.van-nav-bar{
    background-color: inherit;
    .van-nav-bar__left{
      .like-song {
        height: 70%;
        vertical-align: middle;
      }
    }
    .van-nav-bar__title {
      min-width: 80%;
      max-width: 80%;
      .van-icon{
        color: #999;
      }
    }
  }
  }
}
</style>