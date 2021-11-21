<!--推荐新音乐-->
<template>
  <div id="new-song-list">
    <div class="new-title">
      <van-tabs v-model:active="activeName"  @click="tabClick">
        <van-tab title="新歌"></van-tab>
        <van-tab title="专辑"></van-tab>
      </van-tabs>
      <!-- <tab-control :titles="['新歌','专辑']" @tabClick='tabClick' class="tab-control"></tab-control> -->
      <!-- <h2>新歌</h2> -->
    </div>
    <van-swipe :autoplay="0" :show-indicators='false' :loop='false' :stop-propagation='false' ref="swipe">
      <van-swipe-item v-for="(item,index) in fomatRecList" :key="index">
        <div v-if="recData.type=='newSong'">
          <div class="song-item" v-for="(item,index) in item" :key="index" @click="ToShowPlayer(item)">
            <img :src="item.picUrl">
            <div class="song-info">
              <span class="song_title">{{item.name}}</span>
              <span style="color: #999;">—</span>
              <div class="artists-list">
                <span class='artical' v-for="(artists,index) in item.song.artists" :key="index">{{artists.name}} / </span>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <div class="song-item" v-for="(item,index) in item" :key="index" @click="ToAlbumnList(item.id)">
            <img :src="item.picUrl">
            <div class="song-info">
              <span class="song_title">{{item.name}}</span>
              <span style="color: #999;">—</span>
              <div class="artists-list">
                <span class='artical' v-for="(artists,index) in item.artists" :key="index">{{artists.name}} / </span>
              </div>
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import {mapActions,mapMutations} from 'vuex';
import tabControl from 'components/content/tabControl/tabControl.vue'
export default {
  name:'newData',
  props:{
    recData:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data () {
    return {
      activeName:'',

      tId:null
    };
  },
  computed:{
    fomatRecList(){
      return this.splitArray(this.recData.list)
    }
  },
  components: {tabControl},
  methods: {
    ...mapActions(['setCurPlayMusic','showPlayer']),
    ...mapMutations(['updateCurPlayMusicList']),
    splitArray(arr){
      // console.log(arr.length);
      let container=[]
      arr.forEach((item,index)=>{
        let num=Math.floor(index/3)
        if(!container[num])
          container[num]=[]
        container[num].push(item)
      });
      // console.log(container);
      return container
    },
    ToShowPlayer(obj){
      this.updateCurPlayMusicList(this.recData.list)
      this.setCurPlayMusic(obj)
      // 点击歌曲展示播放器
      this.showPlayer(true)
    },
    tabClick(index){
      // 这里不知道为什么click事件执行了两次，于是只能通过防止重复提交的方法强制执行一次了
      window.clearTimeout(this.tId)
      this.tId=window.setTimeout(()=>{
        this.$refs.swipe.swipeTo(0)
        this.$emit('tabClick',index)
      },0)
    },
    ToAlbumnList(ListID){
      window.clearTimeout(this.tId)
      this.tId=window.setTimeout(()=>{
        this.$router.push({
          path:'/songList',
          query:{
            SongListId:ListID,
            type:'Albumn'
          }
        })
      },0)
    }
  },
}

</script>
<style lang='less' scoped>
#new-song-list{
  // padding: 0px 15px 15px 15px;
  border-bottom: 8px solid rgba(128, 128, 128, 0.1);
  background-color: #ffffff;
  .new-title{
    display: flex;
    .van-tabs{
      width: 120px;
      /deep/.van-tab__text{
        font-size: 15px;
        font-weight: bold;
      }
    }
    // /deep/.tab-control{
    //   .tabControl-item{
    //     color: #999;
    //     span{
    //       font-size: 15px;
    //     }
    //     &.active{
    //       color: #333;
    //     }
    //   }
    // }
  }
  .van-swipe{
    padding: 0px 15px 15px 15px;
    .song-item{
      margin: 5px 0;
      width: 60px;
      height: 60px;
      // width: 350px;
      display: flex;
      img{
        width: 100%;
        height: 100%;
        border-radius: 10px
      }
      .song-info{
        flex: 1;
        min-width: 250px;
        max-height: 100%;
        display: flex;
        margin-left: 10px;
        padding: 10px 0px;
        align-items: center;
        .song_title{
          width: 50%;
          font-size: 20px;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 10px;
          overflow: hidden;
        }
        .artists-list{
          max-width: 50%;
          margin-left: 10px;
          overflow: hidden;
          // text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          .artical{
            color: #999;
          }
        }
      }
    }
  }
}
</style>