<!--热门歌手-->
<template>
  <div id="hot-singer">
    <div class="hot-title">
      <h2>热门歌手</h2>
    </div>
    <row-scroll
      :probeType='3'
      ref="rowScroll"
    >
      <div class="singer-list">
        <div class="singer-item" v-for="(item,index) in singerList" :key="index">
          <img :src="item.img1v1Url">
          <span class="name">{{item.name}}</span>
        </div>
      </div>
    </row-scroll>
  </div>
</template>

<script>
import rowScroll from "components/common/scroll/rowScroll.vue";
export default {
  name:'hotSinger',
  props:{
    singerList:{
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
  components: {rowScroll},
}

</script>
<style lang='less' scoped>
#hot-singer{
  padding-bottom: 15px;
  // border-bottom: 8px solid rgba(128, 128, 128, 0.1);
  background-color: #ffffff;
  .hot-title{
    padding: 0px 15px;
    display: flex;
  }

  .singer-list{
    display: flex;
    overflow: scroll;
    padding: 0px 10px;
    .singer-item{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 5px;
      img{
        height: 80px;
        width: 80px;
        border-radius: 50%;
      }
      .name{
        font-size: 16px;
        margin-top: 5px;
      }
    }
  }
}
</style>