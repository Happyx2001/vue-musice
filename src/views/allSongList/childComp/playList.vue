<!--  -->
<template>
  <div id="play-list">
    <div class="list-item" v-for="(item,index) in playlist" :key="index" @click="toPageList(item.id)">
      <div class="item-img">
        <img :src="item.coverImgUrl">
        <span class="count">{{filterCount(item.playCount)}}</span>
      </div>
      <div class="descript">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'playList',
  props:{
    playlist:{
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
        path:'songList',
        query:{
          SongListId:ListID,
        }
      })
    }
  },
}

</script>
<style lang='less' scoped>
#play-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0px 10px;
  .list-item{
      position: relative;
      padding: 0px 5px;
      .item-img{
        img{
          width: 100px;
          border-radius: 10%;
        }
        .count{
          position: absolute;
          left: 50px;
          right: 0;
          top: 7px;
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
        max-width: 100px;
      }
    }
}
</style>