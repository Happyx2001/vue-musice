<!--歌曲列表-->
<template>
  <div id="song">
    <div class="song-item" v-for="(item,index) in songList" :key="index" @click="ToShowPlayer(item)">
      <span class="index">{{index+1}}</span>
      <div class="song-info">
        <span class="song-title">{{item.name}}</span>
        <div class="create-info">
          <span class="creator">{{item.ar[0].name}}</span>
          <span> - </span>
          <span class="album">{{item.al.name}}</span>
        </div>
      </div>
      <img class='menu' src="~assets/icon/songlist/songMenu.png" @click.stop="showSongPanel(item)">
    </div>

    <div class="media-song" v-if="mediaPrograms.length!==0">
      <div class="media-song-item" v-for="(item,index) in mediaPrograms" :key="index" @click="ToShowPlayer(item)">
        <span class="index">{{index+1}}</span>
        <div class="song-info">
          <span class="song-title">{{item.mainSong.name}}</span>
          <div class="num-info">
            <span class="play-count">{{item.listenerCount}}</span>
            <span class="time">{{fomatTime(item.duration)}}</span>
            <span class='creater'>{{item.dj.nickname}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="today-rec-song" v-if="todayRecSong.length!==0">
      <div class="today-rec-song-item" v-for="(item,index) in todayRecSong" :key="index" @click="ToShowPlayer(item)">
        <span class="index">{{index+1}}</span>
        <div class="song-info">
          <span class="song-title">{{item.name}}</span>
          <div class="create-info">
            <span class="creator" v-for='(ar,index) in item.ar' :key="index">{{ar.name}}
              <span v-if="index !== item.ar.length - 1"> / </span>
            </span>
            <span> - </span>
            <span class="album">{{item.al.name}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="recent-song" v-if='recentSong.length!==0'>
      <div class="recent-song-item" v-for="(item,index) in recentSong" :key="index" @click="ToShowPlayer(item)">
        <span class="index">{{index+1}}</span>
        <div class="song-info">
          <span class="song-title">{{item.name}}</span>
          <div class="create-info">
            <span class="creator" v-for='(ar,index) in item.ar' :key="index">{{ar.name}}
              <span v-if="index !== item.ar.length - 1"> / </span>
            </span>
            <span> - </span>
            <span class="album">{{item.al.name}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="puchased-song" v-if="havePurchasedSong.length!==0">
      <div class="puchased-song-item" v-for="(item,index) in havePurchasedSong" :key="index" @click="ToShowPlayer(item)">
        <span class="index">{{index+1}}</span>
        <div class="song-info">
          <span class="song-title">{{item.name}}</span>
          <div class="create-info">
            <span class="creator">{{item.artistName}}</span>
            <span> - </span>
            <span class="album">{{item.albumName}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class='albumn-list' v-if="AlbumnList.length!==0">
      <div class="albumn-list-item" v-for="(item,index) in AlbumnList" :key="index" @click="ToShowPlayer(item)">
        <span class="index">{{index+1}}</span>
        <div class="song-info">
          <span class="song-title">{{item.name}}</span>
          <div class="create-info">
            <span class="creator" v-for='(ar,index) in item.ar' :key="index">{{ar.name}}
              <span v-if="index !== item.ar.length - 1"> / </span>
            </span>
            <span> - </span>
            <span class="album">{{item.al.name}}</span>
          </div>
        </div>
        <img class='menu' src="~assets/icon/songlist/songMenu.png" @click.stop="showSongPanel(item)">
      </div>
    </div>
  </div>
</template>

<script>

import {getSongList} from 'network/songlistdetail'

import {mapActions,mapMutations} from 'vuex';
export default {
  name:'Song',
  props:{
    songIdList:{
      type:Array,
      default(){
        return []
      }
    },
    mediaPrograms:{
      type:Array,
      default(){
        return []
      }
    },
    todayRecSong:{
      type:Array,
      default(){
        return []
      }
    },
    recentSong:{
      type:Array,
      default(){
        return []
      }
    },
    havePurchasedSong:{
      type:Array,
      default(){
        return []
      }
    },
    AlbumnList:{
      type:Array,
      default(){
        return []
      }
    },
    removeSongId:{
      type:Number,
      default:0
    }
  },
  data () {
    return {
      songList:[],

      isShowSongPanel:false,
      curSongPanelObj:null
    };
  },
  watch:{
    songIdList(newValues){
      if(newValues.length!==0){
        let idsUrl=''
        newValues.forEach(element => {
          idsUrl+=element.id+','
        });
        idsUrl=idsUrl.substring(0,idsUrl.length-1)
        this.getSongList(idsUrl)
      }
    },
    removeSongId(newValues){
      let _songList=[]
      Object.assign(_songList,this.songList)
      _songList.splice(_songList.findIndex(e => e.id===newValues),1)
      this.songList=_songList
    },

    // songList(newValues){
    //   this.updateCurPlayMusicList(newValues)
    // },
    // mediaPrograms(newValues){
    //   this.updateCurPlayMusicList(newValues)
    // },
    // todayRecSong(newValues){
    //   this.updateCurPlayMusicList(newValues)   
    // },
    // havePurchasedSong(newValues){
    //   this.updateCurPlayMusicList(newValues)
    // },
    // AlbumnList(newValues){
    //   this.updateCurPlayMusicList(newValues)
    // }

  },
  methods: {
    ...mapActions(['setCurPlayMusic','showPlayer']),
    ...mapMutations(['updateCurPlayMusicList']),
    // 获取歌单里的歌曲信息
    async getSongList(id){
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration:0
      })
      try {
        const res=await getSongList(id)
        // console.log(res);
        this.songList=this.songList.concat(res.songs)
        this.$toast.clear()
      } catch (error) {
        console.log(error);
      }
    },
    ToShowPlayer(obj){
      if(this.mediaPrograms.length!==0)
        this.updateCurPlayMusicList(this.mediaPrograms)
      else if(this.todayRecSong.length!==0)
        this.updateCurPlayMusicList(this.todayRecSong)
      else if(this.havePurchasedSong.length!==0)
        this.updateCurPlayMusicList(this.havePurchasedSong)
      else if(this.AlbumnList.length!==0)
        this.updateCurPlayMusicList(this.AlbumnList)
      else
        this.updateCurPlayMusicList(this.songList)
      this.setCurPlayMusic(obj)
      // 点击歌曲展示播放器
      this.showPlayer(true)
    },
    showSongPanel(obj){
      this.$emit('showSongPanel',obj)
    },
    fomatTime(duration){
      let min = parseInt(duration / 1000 / 60)
      let sec = parseInt(duration / 1000 % 60)
      min = min < 10 ? '0' + min : min
      sec = sec < 10 ? '0' + sec : sec
      return min + ':' + sec
    },
  },
}

</script>
<style lang='less' scoped>
#song{
  overflow: hidden;
  // border-top: 1px solid rgba(0, 0, 0, 0);
  background-color: #fff;
  border-radius: 20px;
  min-height: 620px;
  .song-item{
    display: flex;
    align-items: center;
    padding: 0px 20px;
    margin: 20px 0px;
    width: 100%;
    box-sizing: border-box;
    .index{
      font-size: 18px;
      color: #999;
    }
    .song-info{
      width: 80%;
      margin-left: 5%;
      flex: 1;
      .song-title{
        display: inline-block;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 16px;
      }

      .create-info{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #999;
      }
    }
    .menu{
      width: 20px;
    }
  }

  .media-song{
    .media-song-item{
      display: flex;
      align-items: center;
      padding: 0px 20px;
      margin: 20px 0px;
      width: 100%;
      box-sizing: border-box;
      .index{
        width: 10%;
        font-size: 18px;
        color: #999;
      }
      .song-info{
        width: 90%;
        .song-title{
          display: inline-block;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 16px;
        }

        .num-info{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #999;
          .time{
            margin-left: 8px;
          }
          .creater{
            margin-left: 8px;
          }
        }
      }
    }
  }

  .today-rec-song{
    .today-rec-song-item{
      display: flex;
      align-items: center;
      padding: 0px 20px;
      margin: 20px 0px;
      width: 100%;
      box-sizing: border-box;
      .index{
        width: 10%;
        font-size: 18px;
        color: #999;
      }
      .song-info{
        width: 90%;
        .song-title{
          display: inline-block;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 16px;
        }

        .create-info{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #999;
        }
      }
    }
  }

  .recent-song{
    .recent-song-item{
      display: flex;
      align-items: center;
      padding: 0px 20px;
      margin: 20px 0px;
      width: 100%;
      box-sizing: border-box;
      .index{
        width: 10%;
        font-size: 18px;
        color: #999;
      }
      .song-info{
        width: 90%;
        .song-title{
          display: inline-block;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 16px;
        }

        .create-info{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #999;
        }
      }
    }
  }

  .puchased-song{
    .puchased-song-item{
      display: flex;
      align-items: center;
      padding: 0px 20px;
      margin: 20px 0px;
      width: 100%;
      box-sizing: border-box;
      .index{
        width: 10%;
        font-size: 18px;
        color: #999;
      }
      .song-info{
        width: 90%;
        .song-title{
          display: inline-block;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 16px;
        }

        .create-info{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #999;
        }
      }
    }
  }
  
  .albumn-list{
    .albumn-list-item{
      display: flex;
      align-items: center;
      padding: 0px 20px;
      margin: 20px 0px;
      width: 100%;
      box-sizing: border-box;
      .index{
        width: 10%;
        font-size: 18px;
        color: #999;
      }
      .song-info{
        width: 90%;
        .song-title{
          display: inline-block;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 16px;
        }

        .create-info{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #999;
        }
      }
      .menu{
        width: 20px;
      }
    }
  }
}
</style>