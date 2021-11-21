<!--排行榜列表-->
<template>
  <div id="list">
    <div class="list-item" 
    :class="{column:item.tracks.length!==0}" 
    v-for="(item,index) in rankList" :key="index"
    @click="ToPageSongList(item.id)">
      <div class="top" v-if="item.tracks.length!==0">
        <div class="left">
          <span>{{item.name}}</span>
          <img :src="item.coverImgUrl">
        </div>
        <div class="right">
          <div class="topSong" v-for="(item,index) in item.tracks" :key="index">
            <span>{{index+1}}.{{item.first}}<span>- {{item.second}}</span></span>
          </div>
        </div>
      </div>


      <div class="else" v-else>
        <span class="updateInfo">{{item.updateFrequency}}</span>
        <img class='icon' src="~assets/icon/rankingList/play.png">
        <img class='coverImg' :src="item.coverImgUrl">
        <span class="info">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'rankList',
  props:{
    rankList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {
    };
  },
  components: {},
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
#list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px 15px;
  box-sizing: border-box;
  .list-item{
    .top{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px;
    box-sizing: border-box;
    .left{
      display: flex;
      flex-direction: column;
      align-items: center;
      span{
        font-size: 16px;
        margin-bottom: 5px;
      }
      img{
        width: 50px;
        border-radius: 5px;
      }
    }

    .right{
      width: 80%;
      .topSong{
        width: 100%;
        padding: 3px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 13px;
      }
    }
    }

    .else{
      position: relative;
      width: 110px;
      display: flex;
      flex-direction: column;
      margin: 10px 0;
      .coverImg{
        width: 100%;
        border-radius: 10px;
      }
      .info{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: 3px;
        font-size: 13px;
      }
      .updateInfo{
          position: absolute;
          left: 30px;
          right: 0;
          top: 5px;
          bottom: 0;
          height: 16px;
          width: 70px;
          background-color: rgba(0, 0, 0, 0.3);
          text-align: center;
          color: white;
          border-radius: 20px;
          font-size: 8px;
      }
      .icon{
          position: absolute;
          right: 8px;
          bottom: 28px;
          width: 25px;
      }
    }

    &.column{
      width: 100%;
      background-color: #fff;
      margin: 5px 0;
      border-radius: 10px;
    }
  }
}
</style>