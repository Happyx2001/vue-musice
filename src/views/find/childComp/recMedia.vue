<!--推荐博客-->
<template>
  <div id="rec-media" v-if="recMediaList.length!==0">
    <div class="rec-media-title">
      <h2>热门博客</h2>
      <button @click="buttonActive">换一批</button>
    </div>
    <row-scroll :probeType='3' ref="rowScroll">
      <div class="content">
        <div class="list-item" v-for="(item,index) in recMediaList" :key="index" @click="toPageList(item.creativeId)">
          <div class="item-img">
            <img :src="item.uiElement.image.imageUrl">
            <span class="count">{{filterCount(item.creativeExtInfoVO.playCount)}}</span>
          </div>
          <div class="descript">{{item.uiElement.mainTitle.title}}</div>
        </div>
      </div>
    </row-scroll>
  </div>
</template>

<script>
import rowScroll from "components/common/scroll/rowScroll.vue";
export default {
  name:'recMedia',
  props:{
    recMediaList:{
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
  methods: {
    filterCount(item){
      if(item<100000)
        return item
      else if(item>10000 && item<100000000)
        return (item/10000).toFixed(1) +'万'
      else
        return(item/100000000).toFixed(1)+'亿'
    },
    toPageList(ListID){
      this.$router.push({
        path:'/songList',
        query:{
          SongListId:ListID,
          type:'media'
        }
      })
    }
  },
}

</script>
<style lang='less' scoped>
#rec-media {
  padding-bottom: 10px;
  border-bottom: 8px solid rgba(128, 128, 128, 0.1);
  background-color: #ffffff;
  .rec-media-title {
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
        img{
          width: 100px;
          border-radius: 10%;
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