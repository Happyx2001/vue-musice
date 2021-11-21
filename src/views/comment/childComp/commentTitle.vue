<!--标题-->
<template>
  <div id="comment-title">
    <div class="song"  v-if="Object.keys(curPlayMusic).length!=0">
      <div v-if="curPlayMusic.hasOwnProperty('al')">
        <img :src="curPlayMusic.al.picUrl">
      </div>
      <div v-else-if="curPlayMusic.hasOwnProperty('album')">
        <img :src="curPlayMusic.album.picUrl">
      </div>
      <div v-else>
        <img :src="curPlayMusic.picUrl">
      </div>

      
      <div class="info">
        <span class="title">{{curPlayMusic.name}}</span>
        <span v-if="curPlayMusic.hasOwnProperty('artistName')">{{curPlayMusic.artistName}}</span>
        <div class="artists-list" v-else-if="curPlayMusic.hasOwnProperty('artists')">
          <span class='creator' v-for="(artists,index) in curPlayMusic.artists" :key="index">{{artists.name}}
            <span v-if="index !== curPlayMusic.artists.length - 1"> / </span>
          </span>
        <!-- <span class='artical' v-for="(artists,index) in song.resourceExtInfo.artists" :key="index">{{artists.name}} / </span> -->
        </div>
        <div class="artists-list" v-else>
          <span class='creator' v-for="(artists,index) in curPlayMusic.ar" :key="index">{{artists.name}}
            <span v-if="index !== curPlayMusic.ar.length - 1"> / </span>
          </span>
        <!-- <span class='artical' v-for="(artists,index) in song.resourceExtInfo.artists" :key="index">{{artists.name}} / </span> -->
        </div>
      </div>
    </div>

    <div class="song-list"  v-if="Object.keys(curSongList).length!=0">
      <img :src="curSongList.songImg">
      <div class="info">
        <span class="title">{{curSongList.songTitle}}</span>
        <span class="artists-list">by`{{curSongList.songCreator.nickName}}`</span>
      </div>
    </div>

    <div class="media-list" v-if="Object.keys(curMediaList).length!=0">
      <img :src="curMediaList.coverUrl">
      <div class="info">
        <span class="title">{{curMediaList.name}}</span>
        <span class="artists-list">by`{{curMediaList.dj.nickname}}`</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"commentTitle",
  props:{
    curPlayMusic:{
      type:Object,
      default(){
        return {}
      }
    },
    curSongList:{
      type:Object,
      default(){
        return {}
      }
    },
    curMediaList:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}

</script>
<style lang='less' scoped>
#comment-title{
  background-color: #fff;
  margin-bottom: 5px;
  .song,.song-list,.media-list{
    padding: 10px;
    display: flex;
    img{
      width: 80px;
      border-radius: 10px;
    }
    .info{
      padding: 10px 0px 10px 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      width: ~"calc(100% - 120px)";
      .title{
        font-size: 15px;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .artists-list{
        color: #0000cc;
      }
    }
  }
}
</style>