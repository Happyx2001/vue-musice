<!--顶部导航栏-->
<template>
  <navbar class="nav-bar" :style="{backgroundColor:mybgcolor}">
    <van-nav-bar @click-left="back">
      <template #left>
        <img class='back' src="~assets/icon/songlist/direction-left.png">
      </template>
      <template #title>
        <van-notice-bar scrollable color="#ffffff" background="rgba(0,0,0,0)">
          {{navTitle?navTitle:'歌单'}}
        </van-notice-bar>
      </template>
    </van-nav-bar>
  </navbar>
</template>

<script>
import navbar from "components/content/navbar/navbar";
export default {
  name:'songListNav',
  props:{
    navTitle:{
      type:String,
      default:''
    },
    position:{
      type:Number,
      default:0
    }
  },
  data () {
    return {
      mybgcolor:''
    };
  },
  components: {navbar},
  watch:{
    position(newValues){
      this.mybgcolor='rgba(255,99,71,'+newValues/200+')'
    }
  },
  methods: {
    back(){
      this.$router.back()
    }
  },
}

</script>
<style lang='less' scoped>
.nav-bar{
  position: absolute;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  /deep/.van-nav-bar{
    background-color: inherit;
    .van-nav-bar__left{
      .back {
        height: 50%;
        vertical-align: middle;
      }
    }
    .van-nav-bar__title {
      min-width: 80%;
      max-width: 80%;
    }
  }
}
</style>