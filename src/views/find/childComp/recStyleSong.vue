<!--推荐音乐风格-->
<template>
  <div id="rec-style" v-if="Object.keys('songStyle').length!==0">
    <div class="List-title" v-if="songStyle.hasOwnProperty('uiElement')">
      <h2>{{songStyle.uiElement.subTitle.title}}</h2>
      <button @click="buttonActive">播放</button>
    </div>

    <van-swipe :autoplay="0" :show-indicators='false' :loop='false' :stop-propagation='false'>
      <van-swipe-item v-for="(item,index) in songStyle.creatives" :key="index">
        <div>
          <div class="song-item" v-for="(song,index) in item.resources" :key="index" @click="ToShowPlayer(song)">
            <img :src="song.uiElement.image.imageUrl">
            <div class="info">
              <div class="song-info">
                <span class="song_title">{{song.uiElement.mainTitle.title}}</span>
                <span style="color: #999;">—</span>
                <div class="artists-list">
                  <span class='artical' v-for="(artists,index) in song.resourceExtInfo.artists" :key="index">{{artists.name}}
                    <span v-if="index !== song.resourceExtInfo.artists.length - 1"> / </span>
                  </span>
                <!-- <span class='artical' v-for="(artists,index) in song.resourceExtInfo.artists" :key="index">{{artists.name}} / </span> -->
                </div>
              </div>
              <span class="rec-reson" v-if="song.uiElement.hasOwnProperty('subTitle')">{{song.uiElement.subTitle.title}}</span>
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import {mapActions,mapMutations} from 'vuex';
export default {
  name:'recStyle',
  props:{
    songStyle:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    fomatRecList(){
      return this.conbineArray(this.songStyle.creatives)
    }
  },
  methods: {
    ...mapActions(['setCurPlayMusic','showPlayer']),
    ...mapMutations(['updateCurPlayMusicList']),
    conbineArray(arr){
      let result=[]
      arr.forEach(element => {
        if(element.hasOwnProperty('resources')){
          element.resources.forEach(ele => {
            ele.resourceExtInfo.songData.picUrl=ele.uiElement.image.imageUrl
            result.push(ele.resourceExtInfo.songData)
          })
        }
      });
      return result
    },
    ToShowPlayer(obj){
      console.log(obj);
      this.updateCurPlayMusicList(this.fomatRecList)
      this.setCurPlayMusic(obj.resourceExtInfo.songData)
      // 点击歌曲展示播放器
      this.showPlayer(true)
    },
    buttonActive(){
      this.ToShowPlayer(this.songStyle.creatives[0].resources[0])
    }
  },
}

</script>
<style lang='less' scoped>
#rec-style{
  // padding: 0px 15px 15px 15px;
  border-bottom: 8px solid rgba(128, 128, 128, 0.1);
  background-color: #ffffff;
  .List-title {
    display: flex;
    padding: 0px 15px;
    align-items: center;
    justify-content: space-between;
    button{
      width: 50px;
      height: 20px;
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      &.active{
        background-color: rgba(0, 0, 0, 0.1) !important;
      }
    }
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
        border-radius: 10px;
        object-fit: cover;
      }
      .info{
        flex: 1;
        min-width: 300px;
        max-height: 100%;
        margin-left: 10px;
        padding: 10px 0px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .song-info{
          display: flex;
          align-items: center;
          .song_title{
            max-width: 80%;
            font-size: 16px;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-right: 10px;
            overflow: hidden;
          }
          .artists-list{
            margin-left: 10px;
            overflow: hidden;
            // text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            .artical{
              color: #999;
            }
          }
        }
        .rec-reson{
          color: #999;
        }
      }
    }
  }
}
</style>