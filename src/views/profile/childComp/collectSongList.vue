<!--收藏歌单-->
<template>
  <user-song-list>
    <template v-slot:title>
      <div class="collect-title">
        <div class="title">收藏歌单</div>
        <div class="btn">
          <img
            class='menu-btn'
            src="~assets/icon/profile/menu.png"
          >
        </div>
      </div>
    </template>
    <template v-slot:song-list>
      <div class="song-list" v-if="!collectList.length==0">
        <div class="list-item" v-for="(item,index) in collectList" :key="index"
        @click="ToPageSongList(item.id)">
          <img class='coverImg' :src="item.coverImgUrl">
          <div class="list-info">
            <span class="title">{{item.name}}</span>
            <span class="count">{{item.trackCount}}首</span>
          </div>
        </div>
      </div>
      <div class="song-list" v-else>
        <span>暂无歌单</span>
      </div>
    </template>
  </user-song-list>
</template>

<script>
import userSongList from 'components/content/profile/songList'
export default {
  name:'collectSongList',
  props:{
    collectList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {};
  },
  components: {userSongList},
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
};
</script>
<style lang='less' scoped>
#menu{
  .collect-title{
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
    color: #999;
    .btn{
      img{
        width: 20px;
        &.menu-btn{
          margin-left: 15px;
        }
      }
    }
  }
  .song-list{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50px;
    width: 100%;
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
</style>