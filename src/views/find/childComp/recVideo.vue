<!--推荐视频-->
<template>
  <div id="rec-video">
    <div class="rec-video-title">
      <h2>精选音乐视频</h2>
      <button @click="buttonActive">更多</button>
    </div>
    <row-scroll :probeType='3' ref="rowScroll">
      <div class="content">
        <div class="list-item" v-for="(item,index) in recVideoList" :key="index" @click="ToShowVideoPlayer(item.resource.mlogBaseData)">
          <div class="item-img">
            <img :src="item.resource.mlogBaseData.coverUrl">
            <span class="count">{{filterCount(item.resource.mlogExtVO.playCount)}}</span>
          </div>
          <div class="descript">{{item.resource.mlogBaseData.text}}</div>
        </div>
      </div>
    </row-scroll>
  </div>
</template>

<script>
import rowScroll from "components/common/scroll/rowScroll.vue";

import {mapActions} from 'vuex';
export default {
  name:'recVideo',
  props:{
    recVideoList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {
      tId:null
    };
  },
  components: {rowScroll},
  methods: {
    ...mapActions(['setcurPlayVideoList','ShowVideoPlayer']),
    filterCount(item){
      if(item<100000)
        return item
      else if(item>10000 && item<100000000)
        return (item/10000).toFixed(1) +'万'
      else
        return(item/100000000).toFixed(1)+'亿'
    },
    ToShowVideoPlayer(obj){
      window.clearTimeout(this.tId)
      this.tId=window.setTimeout(()=>{
        this.setcurPlayVideoList(obj)
        this.ShowVideoPlayer(true)
      },0)
    }
  },
}

</script>
<style lang='less' scoped>
#rec-video {
  padding-bottom: 10px;
  border-bottom: 8px solid rgba(128, 128, 128, 0.1);
  background-color: #ffffff;
  .rec-video-title {
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

  .content {
    display: flex;
    padding: 0px 10px;
    overflow: scroll;
    .list-item {
      padding: 0px 5px;
      .item-img {
        position: relative;
        width: 100px;
        height: 150px;
        overflow: hidden;
        border-radius: 10%;
        img{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
        .count {
          position: absolute;
          left: 45px;
          right: 0;
          top: 5px;
          bottom: 0;
          height: 16px;
          width: 50px;
          background-color: rgba(0, 0, 0, 0.3);
          text-align: center;
          color: white;
          border-radius: 20px;
        }
      }

      .descript{
        overflow: hidden;
        // text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>