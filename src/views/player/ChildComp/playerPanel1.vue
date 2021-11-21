<!--歌曲面板-->
<template>
  <div class="play-panel" @click="switchPanel" v-if="Object.keys(songObject).length!==0">
    <div class="play-panel1" v-show="!showLyric">
      <div class='player-needle' v-show="!songObject.radio & songObject.type!='FM'">
        <img src="~assets/icon/player/player-needle.png">
      </div>
      <!-- 当前音乐对象为电台 -->
      <div class="media-cover" v-if="songObject.radio">
        <img class='songImg' :src="songObject.coverUrl">

        <div class="player-bar">
          <div class="bar-item"  @click.stop="likeMedia">
            <img src="~assets/icon/player/like_fill.png" v-if="curMusicIsMyLike(songObject,userLikeSong)">
            <img src="~assets/icon/player/like.png" v-else>
          </div>
          <div class="bar-item"  @click.stop="download">
            <img src="~assets/icon/player/download.png">
          </div>
          <div class="bar-item"  @click.stop="showCommentList('media')">
            <img src="~assets/icon/player/comment.png">
          </div>
          <div class="bar-item" @click.stop="showSettingList">
            <img src="~assets/icon/player/rightlist.png">
          </div>
        </div>
      </div>
      <!-- 当前音乐对象为私人FM -->
      <div class="FM-cover" v-else-if="songObject.type=='FM'">
        <img :src="songObject.album.picUrl">
      </div>
      <!-- 当前音乐对象是在歌单中取出 -->
      <div v-else>
        <div class="record-cover">
          <div class="record-bg" :class="{pause:!playing}">
            <div class='music-bg'>
              <img
                :src="songObject.al? songObject.al.picUrl : songObject.picUrl"
                v-if='Object.keys(songObject).length!=0'
              >
            </div>
          </div>
        </div>
      
        <div class="player-bar">
          <div class="bar-item"  @click.stop="like">
            <img src="~assets/icon/player/like_fill.png" v-if="curMusicIsMyLike(songObject,userLikeSong)">
            <img src="~assets/icon/player/like.png" v-else>
          </div>
          <div class="bar-item"  @click.stop="download">
            <img src="~assets/icon/player/download.png">
          </div>
          <div class="bar-item"  @click.stop="showCommentList">
            <img src="~assets/icon/player/comment.png">
          </div>
          <div class="bar-item" @click.stop="showSettingList">
            <img src="~assets/icon/player/rightlist.png">
          </div>
        </div>
      </div>
    </div>

    <div class="play-panel2" v-show="showLyric">
      <ul v-if="curlyric" class="lyric-wrap" :style="lyricMove">
        <li v-for="(item,index) in curlyric" :key="index"
        :style="{'font-size': (index==currentRow ? '20px':'14px'),'color':(index==currentRow ? '#fff' : '#ccc')}">
          {{item.text}}
        </li>
      </ul>

      <ul v-else class="lyric-wrap">
        <li>暂无歌词</li>
      </ul>
    </div>

    <div v-if="songObject.type!=='FM'">
      <van-overlay :show="isShowSettingPanel" @click.stop="hideSettingList" />
      <div class="setting-panel" :class="{show:isShowSettingPanel}" @click.stop="click">
        <div class='media' v-if="songObject.radio">
          <img :src="songObject.coverUrl">
          <div class="song-info">
            <span class="title">歌曲:{{songObject.name}}</span>
            <div class="creator">
              <span>{{songObject.dj.nickname}}</span>
            </div>
          </div>
        </div>
        <div class="song" v-else>
          <img :src="songObject.al? songObject.al.picUrl : songObject.picUrl">
          <div class="song-info">
            <span class="title">歌曲:{{songObject.name}}</span>
            <div class="creator">
              <span v-for="(artists,index) in songArtists" :key="index">{{artists.name}}
                <span v-if="index !== songArtists.length - 1"> / </span>
              </span>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="set-item" @click.stop="collectToMylist">
            <img src="~assets/icon/songlist/collect.png">
            <span>收藏到歌单</span>
          </div>
          <div class="set-item">
            <img src="~assets/icon/songlist/download.png">
            <span>下载</span>
          </div>
          <div class="set-item">
            <img src="~assets/icon/songlist/share.png">
            <span>分享</span>
          </div>
          <div class="set-item">
            <img src="~assets/icon/songlist/singer.png">
            <span>歌手：</span>
            <div class='singer-list' v-if="songObject.radio">
              <span>{{songObject.dj.nickname}}</span>
            </div>
            <div class="singer-list" v-else>
              <span v-for="(artists,index) in songArtists" :key="index">{{artists.name}}
                <span v-if="index !== songArtists.length - 1"> / </span>
              </span>
            </div>
          </div>
          <div class="set-item">
            <img src="~assets/icon/songlist/albumn.png">
            <span v-if="songObject.radio">电台：{{songObject.radio.name}}</span>
            <span v-else-if="songObject.album">专辑：{{songObject.album.name}}</span>
            <span v-else-if="songObject.song">专辑：{{songObject.song.album.name}}</span>
            <span v-else>专辑：{{songObject.al.name}}</span>
          </div>
        </div>
        <div class="mylist-panel" :class="{show:showMyList}" v-if="!songObject.radio">
          <div class="list-title">
            收藏到歌单
          </div>
          <div class="song-list">
            <div class="list-item" v-for="(item,index) in userAddList" :key="index"
              @click="addSongToList(item.id,item.name,songObject.id)">
              <img class='coverImg' :src="item.coverImgUrl">
              <div class="list-info">
                <span class="title">{{item.name}}</span>
                <span class="count">{{item.trackCount}}首</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

import {SongToMyList} from 'network/songlistdetail'
export default {
  name: "Panel",
  props: {
    songObject: {
      type: Object,
      default() {
        return {};
      },
    },
    currentTime:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
      // 是否展示歌词界面
      showLyric:false,
      // 歌词内容
      lyric:[],
      // 歌词移动样式：滚动
      lyricMove:{},
      // 当前歌词行：当前歌词高亮
      currentRow:0,

      // 展示歌曲操作界面
      isShowSettingPanel:false,
      // 点击收藏按钮展示我的歌单
      showMyList:false,
      // 当前歌曲是否已经是我喜欢的
      isMyLike:false,
    };
  },
  computed:{
    ...mapGetters(['playing','userAddList','userLikeSong']),
    curlyric(){
      const obj=this.$props.songObject
      if(obj.lyric!==undefined){
        if(obj.lyric.lrc!==undefined){
          let text=obj.lyric.lrc.lyric
          return this.fomatLyric(text) || null
        }else
          return false
      }else
        return false
    },
    songArtists(){
      if(this.$props.songObject.ar)
        return this.$props.songObject.ar
      else if(this.$props.songObject.song)
       return this.$props.songObject.song.artists
      else if(this.$props.songObject.artists)
        return this.$props.songObject.artists
    }
  },
  watch:{
    currentTime(values){
      if(!this.lyric)return
      let currentTime = Math.round(values)
      if(currentTime==0){
        this.lyricMove.top=0+'px';
        this.currentRow = 0;
      }
      this.lyric.forEach((element,index) =>{
        if(currentTime==element.time){
          this.lyricMove.top=-index * 30 + 'px';
          this.currentRow = index;
        }
      })
    }
  },
  methods: {
    ...mapActions(['setUserInfo']),
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
    switchPanel(){
      this.showLyric=!this.showLyric
    },
    // 歌词格式化
    fomatLyric(text){
      this.lyric=[]
      let arr=text.split('\n');
      let row=arr.length
      for(let i=0;i<row;i++){
        let temp_arr=[]
        let text=''
        // console.log(arr[i].indexOf(']')==-1);
        if(arr[i].indexOf(']')==-1){
          temp_arr.push(arr[i])
          let obj={}
          obj.text=temp_arr.pop()
          this.lyric.push(obj)
        }
        else{
          temp_arr=arr[i].split("]")
          text=temp_arr.pop()
          temp_arr.forEach(element => {
            let obj={};
            let time_arr=element.substr(1,element.length-1).split(':')
            let formatTime=parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]);
            obj.time=formatTime
            obj.text=text
            this.lyric.push(obj)
          });
        }
      }
      return this.lyric
    },
    // 加入喜欢
    async like(){
      const cookie=localStorage.getItem('cookie')
      let set='add'
      if(this.curMusicIsMyLike(this.songObject,this.userLikeSong))
        set='del'
      try {
        this.$toast.loading({
          duration: 0,
        });
        const res=await SongToMyList(this.userAddList[0].id,this.songObject.id,set,cookie)
        await this.setUserInfo()
        if(set=='add'){
          this.$toast.success({
            message: "感谢你的喜欢，爱你哟(*^▽^*)",
            duration: 2000,
          })
        }else{
        this.$toast.success({
          message:"真的要离开我吗o(╥﹏╥)o",
          // message: "取消喜欢"+this.songObject.name+'成功',
          duration: 2000,
        })
        }
      } catch (error) {
        console.log(error);
      }
    },
    download(){

    },
    // 展示评论
    showCommentList(type){
      this.$emit('showCommentList',type)
    },
    // 展示歌曲操作界面
    showSettingList(){
      this.isShowSettingPanel=true
    },
    // 隐藏歌曲操作界面
    hideSettingList(){
      if(this.showMyList)
        this.showMyList=false
      else
        this.isShowSettingPanel=false
    },
    // 收藏歌曲到我的歌单时展示我的歌单
    collectToMylist(){
      this.showMyList=true
    },
    // 收藏到我的歌单
    async addSongToList(ListId,ListName,SongId){
      const cookie=localStorage.getItem('cookie')
      try {
        this.$toast.loading({
          duration: 0,
        });
        const res=await SongToMyList(ListId,SongId,'add',cookie)
        // console.log(res);
        if(res.body.code==502){
          this.$toast.fail({
            message: res.body.message,
            duration: 2000,
          })
        }
        else{
          await this.setUserInfo()
          this.$toast.success({
            message: "已添加到"+ListName,
            duration: 2000,
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>
<style lang='less' scoped>
.play-panel {
  .play-panel1 {
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 100px;
    .player-needle {
      position: absolute;
      z-index: 1;
      top: -1px;
      left: 45%;
      img {
        height: 160px;
      }
    }

    .media-cover{
      width: 100%;
      height: 100%;
      .songImg{
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 40%;
        width: 250px;
        border-radius: 20px;
      }
    }

    .FM-cover{
      position: absolute;
      transform: translate(-50%, -50%);
      left: 50%;
      top: 40%;
      img{
        width: 250px;
        border-radius: 20px;
      }
    }

    .record-cover {
      width: 274px;
      height: 274px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      top: 100px;
      display: flex;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      & .pause{
        animation-play-state: paused !important;
      }
      .record-bg {
        animation: rotatebg 20s linear infinite;
        width: 100%;
        height: 100%;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: center;
        justify-content: center;
        -ms-flex-align: center;
        align-items: center;
        background-image: url("~assets/icon/player/record-bg.png");
        background-size: 100% 100%;
        @keyframes rotatebg {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(180deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .music-bg {
          width: 68%;
          height: 68%;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }

    .player-bar {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      bottom: 22px;
      display: flex;
      width: 70%;
      justify-content: space-between;
      .bar-item {
        img {
          width: 23px;
        }
      }
    }
  }

  .play-panel2{
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 100px;
    overflow: hidden;
    ul{
      position: relative;
      // padding-top: 65%;
      top: 0;
      padding-top: 65%;
      transition: all .8s;
      li {
        font-size: 14px;
        /*padding: 5px 0;*/
        min-height: 30px;
        line-height: 30px;
        text-align: center;
        color: #ccc;
      }
    }
  }

  .setting-panel{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    transform: translateY(100%);
    transition: all .3s;
    z-index: 999;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    &.show{
      // top: 40%;
      transform: translateY(30%);
    }
    .song,.media{
      display: flex;
      padding: 15px;
      border-bottom: 1px solid rgba(211,211,211, 0.3);
      img{
        width: 60px;
        border-radius: 10px;
      }
      .song-info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 10px;
        max-width: 250px;
        .title{
          font-size: 14px;
        }
        .creator{
          color: #999;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .panel{
      height: 400px;
      width: 100%;
      .set-item{
        display: flex;
        align-items: center;
        padding: 10px 15px;
        img{
          width: 25px;
        }
        span{
          margin-left: 10px;
          font-size: 14px;
        }
        .singer-list{
          max-width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span{
            margin: 0;
          }
        }
      }
    }
    .mylist-panel{
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #fff;
      transform: translateY(100%);
      transition: all .3s;
      z-index: 1000;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      overflow: hidden;
      &.show{
        transform: translateY(0);
      }
      .list-title{
        padding: 20px 10px;
        font-size: 16px;
        font-weight: bold;
      }
      .song-list{
        padding: 0px 10px;
        max-height: 461px;
        overflow: scroll;
        .list-item{
          width: 100%;
          display: flex;
          margin-bottom: 10px;
          .coverImg{
            width: 50px;
            height: 50px;
            border-radius: 10px;
          }

          .list-info{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 5px 10px;
            box-sizing: border-box;
            .title{
              font-size: 15px;
              color: #333;
            }
          } 
        }
        span{
          color: #999;
        }
      }
    }
  }
}
</style>