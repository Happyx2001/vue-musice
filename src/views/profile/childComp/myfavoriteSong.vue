<!--我喜欢的音乐-->
<template>
  <div id="my-favorite-song">
    <div class="like-list" v-if="Object.keys(LikeListSong).length !== 0" @click="ToPageSongList(LikeListSong.id)">
      <div class="list-img">
        <img class='songImg' :src='LikeListSong.coverImgUrl'>
      </div>
      <div class="list-info">
        <span class="title">我喜欢的音乐</span>
        <span class="count">{{LikeListSong.trackCount}}首</span>
      </div>
    </div>

    <div class="like-list" v-else>
      <div class="list-img">
        <img class='songImg' src='~assets/icon/profile/square.png'>
        <img class='icon' src="~assets/icon/profile/aixin.png">
      </div>
      <div class="list-info">
        <span class="title">我喜欢的音乐</span>
        <span class="count">0首</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'likeSong',
  props:{
    LikeListSong:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    ToPageSongList(ListID){
      this.$router.push({
        path:'/songList',
        query:{
          SongListId:ListID
        }
      })
    }
  },
}

</script>
<style lang='less' scoped>
#my-favorite-song{
  margin: 10px 15px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  .like-list{
    display: flex;
    align-items: center;
    .list-img{
      position: relative;
      // padding: 15px;
      // background-color: #999;
      .songImg{
        width: 60px;
        height:60px;
        border-radius: 10px;
      }

      .icon{
        position: absolute;
        left: 25%;
        right: 0;
        top: 25%;
        bottom: 0;
        width: 30px;
        height:30px;
        vertical-align: middle;
      }
    }

    .list-info{
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      .title{
        font-size: 16px;
        font-weight: 400;
      }
      .count{
        color: #999;
      }
    }
  }
}
</style>