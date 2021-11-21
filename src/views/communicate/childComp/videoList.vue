<!--视频列表-->
<template>
  <div id="video-list" v-if="videoInfo.length!==0">
    <div class="list-item" v-for="(item,index) in videoInfo" :key="index" @click="ToShowVideoPlayer(item)">
      <img :src="item.data.coverUrl">
      <div class="description">
        <span>{{item.data.title}}</span>
        <div class="count">
          <span class="share">转发:{{filterCount(item.data.shareCount)}}</span>
          <span class="praise">点赞:{{filterCount(item.data.praisedCount)}}</span>
        </div>
      </div>
    </div>
  </div>
  <div id="none-list" v-else>
    暂无相关视频
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name:'videoList',
  props:{
    videoInfo:{
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
    ...mapActions(['ShowVideoPlayer','setcurPlayVideoList']),
    ToShowVideoPlayer(obj){
      this.setcurPlayVideoList(obj)
      // console.log(obj);
      // 点击视频展示视频播放器
      this.ShowVideoPlayer(true)
    },
    filterCount(item){
      if(item<10000)
        return item
      else if(item>10000 && item<100000000)
        return (item/10000).toFixed(1) +'万'
      else
        return(item/100000000).toFixed(1)+'亿'
    }
  },
}
</script>
<style lang='less' scoped>
#video-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 5px;
  .list-item{
    background-color: #fff;
    margin: 8px 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    img{
      width: 170px;
      height: 100px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .description{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      max-width: 170px;
      height: 80px;
      padding: 5px 5px 10px;
      box-sizing: border-box;
      font-size: 12px;
      font-weight: 500;
      .count{
        color: #999;
        .praise{
          margin-left: 10px;
        }
      }
    }
  }
}
#none-list{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 670px;
  font-size: 18px;
  color: #999;
}
</style>