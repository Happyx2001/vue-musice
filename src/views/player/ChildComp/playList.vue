<!--播放列表-->
<template>
  <!-- 这里有个BUG:当curPlayMusic对象的type为FM时，也会渲染v-else里的变量，
  可能是因为vue页面渲染比curPlayMusic更新的速度快，所以当curPlayMusic没有type之前已经渲染完了，有了type后页面正常渲染
  导致了未找到artists的报错 ，目前未发现解决方法（哭泣ing）-->
  <div class="play-list"
  :class="{showPlayList:isShowPlayList}">
    <div v-if="curPlayMusic.type =='FM'">
    </div>
    <div v-else>
      <div class="play-list-title" @click="hidePlatList">
        播放列表（{{curPlayMusicList.length}}）{{curPlayMusicIndex}}
        <img src="~assets/icon/playList/hideicon.png">
      </div>
      <div class="play-list-content">
        <ul>
          <li class="play-list-item" v-for="(item,index) in curPlayMusicList" :key="index">
            <div class="song-name" :class="{current: item.id === curPlayMusic.id}" @click="playMusicFromList(item)">
              {{item.name}} -
              <span v-if="item.ar">
                <span v-for="(value,i) in item.ar" :key="i">{{value.name}}
                  <span v-if="i !== item.ar.length - 1"> / </span>
                </span>
              </span>
              <span v-else-if="item.dj">{{item.dj.nickname}}</span>   
              <span v-else-if="item.hasOwnProperty('artistName')">{{item.artistName}}</span>
              <span v-else-if="item.hasOwnProperty('artists')">
                <span v-for="(value,i) in item.artists" :key="i">{{value.name}}
                  <span v-if="i !== item.artists.length - 1"> / </span>
                </span>
              </span>
              <span v-else>
                <span v-for="(value,i) in item.song.artists" :key="i">{{value.name}}
                  <span v-if="i !== item.song.artists.length - 1"> / </span>
                </span>
              </span>
            </div>
            <div class="song-del"><img src="~assets/icon/playList/close.png"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations,mapActions} from 'vuex';
export default {
  name:'playList',
  computed:{
    ...mapGetters(['curPlayMusicList','curPlayMusic','isShowPlayList','curPlayMusicIndex']),
  },
  watch:{
    curPlayMusic(newvalues){
      // console.log(this.curPlayMusicList);
      if(this.curPlayMusicList.length > 0){
        const index=this.curPlayMusicList.findIndex((ele)=>{
          if(ele.hasOwnProperty('songId'))
            return ele.songId===newvalues.songId
          else
            return ele.id === newvalues.id
        })
        this.updateCurPlayMusicIndex(index+1)
      }
      else
        this.updateCurPlayMusicIndex(0)
    }
  },
  methods: {
    ...mapActions(['setCurPlayMusic']),
    ...mapMutations(['updateCurPlayMusicIndex','updateCurPlayMusicList','updateIsShowPlayList']),
    hidePlatList(){
      this.updateIsShowPlayList(false)
    },
    playMusicFromList(obj){
      this.setCurPlayMusic(obj)
    },
    fomat(item){

    }
  }
}

</script>
<style lang='less' scoped>
.play-list{
    position: fixed;
    width: 95%;
    left: 50%;
    bottom: 0;
    right: 0;
    background-color: #fff;
    z-index: 1000;
    border-radius: 20px;
    transition: all .3s;
    transform: translate(-50%, 100%);
    padding: 10px 10px;
    box-sizing: border-box;
    &.showPlayList{
      transition: all .3s;
      transform: translate(-50%,0)
    }
    .play-list-title{
      font-size: 20px;
      margin-bottom: 10px;
      img{
        width: 26px;
        height: 26px;
        float: right;
      }
    }

    .play-list-content{
      max-height: 400px;
      overflow: scroll;
      .play-list-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
        font-size: 16px;
        .song-name{
          width: 80%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          span{
            font-size: 12px;
            color: #999;
          }
        }
        .song-del{
          img{
            height: 26px;
          }
        }
      }
    }
}
</style>