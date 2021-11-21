<!--歌曲操作界面-->
<template>
  <div id="song-panel" v-if="Object.keys(curSong).length!=0">
    <div class="song">
      <img :src="curSong.al.picUrl">
      <div class="song-info">
        <span class="title">歌曲:{{curSong.name}}</span>
        <div class="creator">
          <span v-for="(artists,index) in curSong.ar" :key="index">{{artists.name}}
            <span v-if="index !== curSong.ar.length - 1"> / </span>
          </span>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="set-item" @click="collectToMylist">
        <img src="~assets/icon/songlist/collect.png">
        <span>收藏到歌单</span>
      </div>
      <div class="set-item" @click="showCommentList">
        <img src="~assets/icon/songlist/comment.png">
        <span>评论</span>
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
        <div class="singer-list">
          <span v-for="(artists,index) in curSong.ar" :key="index">{{artists.name}}
            <span v-if="index !== curSong.ar.length - 1"> / </span>
          </span>
        </div>
      </div>
      <div class="set-item">
        <img src="~assets/icon/songlist/albumn.png">
        <span>专辑：{{curSong.al.name}}</span>
      </div>
      <div class="set-item" v-show="isOrder" @click="delectSongInMyList(listId,curSong.id,curSong.name)">
        <img src="~assets/icon/songlist/delect.png">
        <span>删除</span>
      </div>
    </div>
    <div class="mylist-panel" :class="{show:showMyList}">
      <div class="list-title">
        收藏到歌单
      </div>
      <div class="song-list">
        <div class="list-item" v-for="(item,index) in userAddList" :key="index"
          @click="addSongToList(item.id,item.name,curSong.id)">
          <img class='coverImg' :src="item.coverImgUrl">
          <div class="list-info">
            <span class="title">{{item.name}}</span>
            <span class="count">{{item.trackCount}}首</span>
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
  name:'songPanel',
  props:{
    curSong:{
      type:Object,
      default(){
        return {}
      }
    },
    isOrder:{
      type:Boolean,
      default:false
    },
    listId:{
      type:String,
      default:''
    }
  },
  data () {
    return {
      showMyList:false
    };
  },
  computed:{
    ...mapGetters(['userAddList'])
  },
  components: {},
  methods: {
    ...mapActions(['setUserInfo']),
    // 点击收藏先展示我的歌单
    collectToMylist(){
      this.showMyList=true
    },
    // 展示评论列表
    showCommentList(){
      const obj={
        id:this.curSong.id,
        type:0,
        curMusic:this.curSong
      }
      this.$store.commit('updataCurCommentObj',obj)
      this.$store.commit('updataShowComment',true)
    },
    // 加入我的歌单
    async addSongToList(ListId,ListName,SongId){
      const cookie=localStorage.getItem('cookie')
      try {
        this.$toast.loading({
          duration: 0,
        });
        const res=await SongToMyList(ListId,SongId,'add',cookie)
        console.log(res);
        await this.setUserInfo()
        this.$toast.success({
          message: "已添加到"+ListName,
          duration: 2000,
        })
      } catch (error) {
        console.log(error);
      }
    },
    // 从我的歌单删除
    async delectSongInMyList(ListId,SongId,SongName){
      const cookie=localStorage.getItem('cookie')
      try {
        this.$toast.loading({
          duration: 0,
        });
        const res=await SongToMyList(ListId,SongId,'del',cookie)
        console.log(res);
        await this.setUserInfo()
        this.$toast.success({
          message: "已成功删除"+SongName,
          duration: 2000,
        })
        this.$emit('delSongInList',SongId)
      } catch (error) {
        console.log(error);
      }
    }
  },
}

</script>
<style lang='less' scoped>
#song-panel{
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
  .song{
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
</style>