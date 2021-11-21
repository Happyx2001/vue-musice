<!--歌单介绍部分-->
<template>
  <div id="song-list-title">
    <img class='bg' :src="songInfo.songImg">
    <div class="detail">
      <div class="detail-img">
        <img src="~assets/icon/songlist/quare.png">
        <img class='img' :src="songInfo.songImg" v-show="Object.keys(songInfo).length!=0">
      </div>
      <div class="detail-info">
        <div class="top">
          <span class="title">{{songInfo.songTitle}}</span>
          <div class="creator">
            <img class="coverImg" :src="songInfo.songCreator.coverImg">
            <span class="nickName">{{songInfo.songCreator.nickName}}</span>
          </div>
        </div>
        <div class="description" v-if="listType!='media'" @click="showListDetail">
          <span v-if="songInfo.songDescription">{{songInfo.songDescription}}</span>
          <span v-else>暂无歌单描述</span>
          <img src="~assets/icon/songlist/arrow-right.png">
        </div>
        <!-- <span class="decription" v-if="songInfo.songDescription">{{songInfo.songDescription}}</span>
        <span class="decription" v-else>暂无歌曲描述</span> -->
      </div>
    </div>

    <div class="opration">
      <div class="opration-item"  @click="(listType=='' & !songInfo.isSet) && collectEvent()">
        <img src="~assets/icon/songlist/haveCollect.png" v-if="songInfo.isCollect">
        <img src="~assets/icon/songlist/collect.png" v-else>
        <span>{{filterCount(songInfo.songCollectCount)}}</span>
      </div>
      <div class="opration-item" @click.stop="showCommentList">
        <img src="~assets/icon/songlist/comment.png">
        <span>{{filterCount(songInfo.songCommentCount)}}</span>
      </div>
      <div class="opration-item" @click.stop="share">
        <img src="~assets/icon/songlist/share.png">
        <span>{{filterCount(songInfo.songShareCount)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'songListTitle',
  props:{
    songInfo:{
      type:Object,
      default(){
        return {}
      }
    },
    listId:{
      type:String,
      default:''
    },
    listType:{
      type:String,
      default:''
    }
  },
  data () {
    return {
    };
  },
  components: {},
  methods: {
    filterCount(item){
      if(item<100000)
        return item
      else if(item>10000 && item<100000000)
        return (item/10000).toFixed(1) +'万'
      else
        return(item/100000000).toFixed(1)+'亿'
    },
    showListDetail(){
      this.$emit('showListDetail')
    },
    collectEvent(){
      this.$emit('collectEvent')
    },
    showCommentList(){
      let obj={}
      if(this.listType=='media'){
        obj={
          id:this.listId,
          type:4,
          curSongList:this.songInfo
        }
      }else if(this.listType=='Albumn'){
        obj={
          id:this.listId,
          type:3,
          curSongList:this.songInfo
        }
      }else{
        obj={
          id:this.listId,
          type:2,
          curSongList:this.songInfo
        }
      }
      console.log(obj);
      this.$store.commit('updataCurCommentObj',obj)
      this.$store.commit('updataShowComment',true)
    },
    share(){

    }
  },
}

</script>
<style lang='less' scoped>
#song-list-title{
  padding: 60px 20px;
  // background-color: #DCDCDC;
  // background-color: brown;
  border-bottom-left-radius: 10%;
  border-bottom-right-radius: 10%;
  overflow: hidden;
  .bg{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    // height: 100%;
    width: 100%;
    z-index: -1;
    filter: blur(80px);
  }
  .detail{
    display: flex;
    .detail-img{
      position: relative;
      width: 80px;
      height: 80px;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .img{
        position: absolute;
        left: 0;
        right: 0;
        top: 20;
        bottom: 0;
        border-radius: 10px;
      }
    }

    .detail-info{
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      flex: 1;
      .top{
        display: flex;
        flex-direction: column;
        .title{
        font-size: 14px;
        color: #fff;
        overflow: hidden;
        // text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        }
      
        .creator{
          display: flex;
          align-items: center;
          .coverImg{
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          .nickName{
            margin-left: 8px;
            color: #F5F5F5;
          }
        }
      }

      .description{
        display: flex;
        justify-content: space-between;
        span{
          display: inline-block;
          width: 90%;
          color:#F5F5F5;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        img{
          width: 10px;
        }
      }
    }
  }
  
  .opration{
    position: absolute;
    display: flex;
    justify-content: space-evenly;
    top: 182px;
    left: 10%;
    width: 80%;
    height: 40px;
    border-radius: 40px;
    background-color: #fff;
    .opration-item{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 8px 0;
      padding: 0 8px;
      border-right: 1px solid rgba(0, 0, 0, 0.1);
      img{
        width: 20px;
      }
      span{
        font-size: 12px;
        margin-left: 3px;
      }
      &:nth-child(3){
        border: none;
      }
    }
  }
}
</style>