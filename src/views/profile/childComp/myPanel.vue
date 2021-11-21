<!---->
<template>
  <div id="my-panel" v-if="hasLogin">
    <div class="panel-item" @click="ToPageSongList">
      <img src="~assets/icon/profile/goods_fill.png">
      <span>已购</span>
    </div>
    <div class="panel-item" @click="RecentSong">
      <img src="~assets/icon/profile/video_fill.png">
      <span>最近播放</span>
    </div>
    <div class="panel-item">
      <img src="~assets/icon/profile/favor_fill.png">
      <span>收藏和赞</span>
    </div>
    <div class="panel-item">
      <img src="~assets/icon/profile/WIFI.png">
      <span>我的播客</span>
    </div>
    <!-- <svg aria-hidden="true">
        <use xlink:href="#icon-cloudgoodsfill"></use> 
    </svg> -->
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name:'myPanel',
  data () {
    return {
    };
  },
  components: {},
  computed:{
    ...mapGetters(['hasLogin'])
  },
  methods: {
    ToPageSongList(){
      this.$router.push({
        path:'/songList',
        query:{
          type:'havePurchased'
        }
      })
    },
    RecentSong(){
      this.$router.push({
        path:'/songList',
        query:{
          type:'recentSong'
        }
      })
    }
  },
}

</script>
<style lang='less' scoped>
#my-panel{
  margin: 10px 15px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  .panel-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      width: 30px;
    }
    span{
      font-size: 12px;
    }
  }
}
</style>