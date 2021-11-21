<!--搜素列表-->
<template>
  <div id="search-list" v-if="searchData.hasOwnProperty('type')">
    <div class="song" v-if="searchData.type==1">
      <div class='song-item' v-for="(item,index) in searchData.list" :key="index" @click="ToShowPlayer(item)">
        <span class="index">{{index+1}}</span>
        <div class="song-info">
          <span class="song-title">{{item.name}}</span>
          <div class="create-info">
            <span class="creator">{{item.ar[0].name}}</span>
            <span> - </span>
            <span class="album">{{item.al.name}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="play-list" v-if="searchData.type==1000">
      <div class="play-list-item" v-for="(item,index) in searchData.list" :key="index"
      @click='ToPageSongList(item.id)'>
        <img :src="item.coverImgUrl">
        <div class='play-list-info'>
          <span class='title'>{{item.name}}</span>
          <div class="count-info">{{item.trackCount}}首，by {{item.creator.nickname}}，播放{{item.playCount}}次</div>
        </div>
      </div>
    </div>

    <div class="media-list" v-if="searchData.type==1009">
      <div class="media-list-item" v-for="(item,index) in searchData.list" :key="index"
      @click='ToPageMediaList(item.id)'>
        <img :src="item.picUrl">
        <div class='media-list-info'>
          <span class='title'>{{item.name}}</span>
          <div class="count-info">{{item.programCount}}个声音，by {{item.dj.nickname}}，播放{{item.playCount}}次</div>
        </div>
      </div>
    </div>

    <div class="video" v-if="searchData.type==1014">
      <div class="video-item" v-for="(item,index) in searchData.list" :key="index" @click="ToShowVideoPlayer(item)">
        <div class="info">
          <div class="user-info">
            <img v-if="item.hasOwnProperty('data')" :src="item.data.creator.avatarUrl">
            <img v-else src="~assets/icon/profile/avatar.svg">
            <span>{{item.creator[0].userName}}</span>
          </div>
          <div class="description">{{item.title}}</div>
        </div>
        <div class="videoImg">
          <img :src="item.coverUrl">
        </div>
        <!-- <div class="description">
          <span>{{item.title}}</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex';
export default {
  name:'searchList',
  props:{
    searchData:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data () {
    return {
    };
  },
  components: {},
  methods: {
    ...mapActions(['showPlayer','ShowVideoPlayer','setcurPlayVideoList','setCurPlayMusic']),
    ...mapMutations(['updateCurPlayMusicList']),
    filterCount(item){
      if(item<10000)
        return item
      else if(item>10000 && item<100000000)
        return (item/10000).toFixed(1) +'万'
      else
        return(item/100000000).toFixed(1)+'亿'
    },
    ToShowPlayer(obj){
      this.updateCurPlayMusicList(this.searchData.list)
      this.setCurPlayMusic(obj)
      // 点击歌曲展示播放器
      this.showPlayer(true)
    },
    ToPageSongList(ListID){
      this.$router.push({
        path:'/songList',
        query:{
          SongListId:ListID
        }
      })
    },
    ToPageMediaList(ListID){
      this.$router.push({
        path:'/songList',
        query:{
          SongListId:ListID,
          type:'media'
        }
      })
    },
    ToShowVideoPlayer(obj){
      this.setcurPlayVideoList(obj)
      // console.log(obj);
      // console.log(obj);
      // 点击视频展示视频播放器
      this.ShowVideoPlayer(true)
    },
  },
}

</script>
<style lang='less' scoped>
#search-list{
  overflow: hidden;
  // border-top: 1px solid rgba(0, 0, 0, 0);
  background-color: #fff;
  min-height: 620px;
  .song-item{
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

  .play-list{
    .play-list-item{
      display: flex;
      padding: 5px 10px;
      img{
        width: 60px;
        border-radius: 10px;
      }
      .play-list-info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 8px;
        width: 80%;
        .title{
          font-size: 15px;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  .media-list{
    .media-list-item{
      display: flex;
      padding: 5px 10px;
      img{
        width: 60px;
        border-radius: 10px;
      }
      .media-list-info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 8px;
        width: 80%;
        .title{
          font-size: 15px;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  .video{
    display: flex;
    // flex-wrap: wrap;
    flex-direction: column;
    padding: 5px;
    background-color: #f5f5f5;
    .video-item{
      padding: 8px;
      background-color: #fff;
      margin: 8px 0;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      border-radius: 10px;
      .info{
        .user-info{
          display: flex;
          align-items: center;
          img{
            width: 50px;
          }
          span{
            font-size: 14px;
          }
        }
        .description{
          font-size: 14px;
          padding: 8px 0;
        }
      }
      .videoImg{
        img{
          width: 100%;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>