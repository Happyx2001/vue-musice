<!--缩小版音乐播放器-->
<template>
  <div 
  class="audio-nav" :class='{hide:!isShowPlayerNav,top:tabBarShow}'
  v-if="JSON.stringify(curPlayMusic) !== '{}'"
  @click="showPlayer">
    <div class="music-wrap" @click="showPlayer">
      <div class="music-img">

        <div class="media-cover" v-if="curPlayMusic.radio">
          <img :src="curPlayMusic.radio.picUrl">
        </div>

        <div class="FM-cover" v-else-if="curPlayMusic.type=='FM'">
          <img :src="curPlayMusic.album.picUrl">
        </div>

        <div class="record-bg" :class="{pause:!playing}" v-else>
          <div class='music-bg'>
            <img :src="curPlayMusic.al? curPlayMusic.al.picUrl : curPlayMusic.picUrl" alt="">
          </div>
        </div>
        <!-- <img :src="curPlayMusic.al.picUrl" alt=""> -->
      </div>
      <div class="music-con">
        <p class="music-name" v-if="curPlayMusic">{{curPlayMusic.name}}</p>
        <!-- <p class="music-lyric">{{curLyric}}</p> -->
      </div>
    </div>
    <div class="music-btn">
      <div class="nav-btn-play">
        <img src="~assets/icon/player/playmini.png" v-if="!playing" @click.stop="play">
        <img src="~assets/icon/player/pausemini.png" v-else @click.stop="pause">
      </div>
      <div class="nav-btn-list">
        <img src="~assets/icon/player/playlistmini.png" @click.stop="showPlayList">
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
export default {
  name:'MiniPlayer',
  data () {
    return {
    };
  },
  computed:{
    ...mapGetters(['curPlayMusic','playing','isShowPlayer','tabBarShow','isShowPlayerNav'])
  },
  components: {},
  methods: {
    ...mapMutations(['updatePlaying','updateShowPlayer','updateShowPlayerNav']),
    play(){
      document.getElementById('music').play()
      this.updatePlaying(true)
    },
    pause(){
      document.getElementById('music').pause()
      this.updatePlaying(false)
    },
    showPlayer(){
      this.updateShowPlayer(true)
      this.updateShowPlayerNav(false)
    }
  },
}

</script>
<style lang='less' scoped>
.audio-nav{
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  z-index: 999;
  padding: 0 10px;
  .music-wrap{
    display: flex;
    align-items: center;
    width: 70%;
    .music-img{
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      & .pause{
        animation-play-state: paused !important;
      }
      .media-cover{
        img{
          width: 50px;
          border-radius: 5px;
        }
      }
      .FM-cover{
        img{
          width: 50px;
          border-radius: 5px;
        }
      }
      .record-bg{
        width: 100%;
        height: 100%;
        animation: rotatebg 20s linear infinite;
        display: flex;
        align-items: center;
        justify-content: center;
        background-size: 100% 100%;
        background-image: url("~assets/icon/player/record-bg.png");
        @keyframes rotatebg {
        0% {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(180deg);
        }
        100% {
          transform: rotate(360deg);
        }
        }
        .music-bg {
          width: 77%;
          height: 77%;
          border-radius: 50%;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
      // img{
      //   width: 100%;
      // }
    }
    .music-con{
      margin-left: 10px;
      width: 70%;
      .music-name{
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .music-btn{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 30%;
    .nav-btn-play{
      width: 40px;
      img{
        width: 100%;
      }
    }

    .nav-btn-list{
      width: 40px;
      img{
        width: 100%;
      }
    }
  }

  &.hide{
    display: none;
  }

  &.top{
    bottom: 46px;
  }
}
</style>