<!--顶部导航栏-->
<template>
  <navbar>
    <van-nav-bar @click-left="hidePlayer">
      <template #left>
        <img class='back' src="~assets/icon/songlist/direction-left.png">
      </template>
      <template #title>
        <van-notice-bar scrollable color="#ffffff" background="rgba(0,0,0,0)" v-if='isShowPlayer'>
          {{songObject? songObject.name:''}}
        </van-notice-bar>
        <span class="creator" v-if="songObject.hasOwnProperty('dj')">{{songObject.dj.nickname}}</span>
        <span class="creator" v-else-if="songObject.hasOwnProperty('artistName')">{{songObject.artistName}}</span>
        <span class="creator" v-for="(item,index) in songArtists" :key="index" v-else>{{item.name}}/</span>
      </template>
      <template #right>
        <img class='share' src="~assets/icon/player/share.png" alt="">
      </template>
    </van-nav-bar>
  </navbar>
</template>

<script>
import navbar from "components/content/navbar/navbar";

import {mapMutations,mapGetters, mapActions} from 'vuex'
export default {
  name:'playerNav',
  props:{
    songObject:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data () {
    return {
    };
  },
  computed:{
    // 引入这个的原因是：因为在播放界面设置为none的时候,再进入会导致通知栏不会滚动
    ...mapGetters(['isShowPlayer']),
    songArtists(){
      if(this.$props.songObject.ar)
        return this.$props.songObject.ar
      else if(this.$props.songObject.song)
       return this.$props.songObject.song.artists
      else if(this.$props.songObject.artists)
        return this.$props.songObject.artists
    }
  },
  components: {navbar},
  methods: {
    ...mapActions(['showPlayer']),
    hidePlayer(){
      this.showPlayer(false)
    }
  },
}

</script>
<style lang='less' scoped>
/deep/.van-nav-bar{
  background-color: rgba(0, 0, 0, 0);
  .van-nav-bar__content{
    min-height: 60px;
    .van-nav-bar__left{
      .back{
        height: 50%;
        vertical-align: middle;
      }
    }

    .van-nav-bar__title{
      min-width: 80%;
      max-width: 80%;
      .van-notice-bar{
        width: 150px;
        margin: 0px auto;
        .van-notice-bar__wrap{
          height: 30px;
          .van-notice-bar__content{
            font-size: 20px;
          }
        }
      }
      span{
        color: #fff;
        font-size: 14px;
      }
    }

    .van-nav-bar__right{
      .share{
        height: 50%;
        vertical-align: middle;
      }
    }
  }
}
</style>