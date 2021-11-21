<!---->
<template>
  <navbar class="nav-bar">
    <van-nav-bar @click-left="back">
      <template #left>
        <img class='back' src="~assets/icon/navbar/back.png">
      </template>
      <template #title>
        <span>排行榜</span>
      </template>
    </van-nav-bar>
  </navbar>
</template>

<script>
import navbar from "components/content/navbar/navbar";
export default {
  name:'rankListNav',
  data () {
    return {
    };
  },
  components: {navbar},
  methods: {
    back(){
      this.$router.back()
    }
  }
}
</script>
<style lang='less' scoped>
.nav-bar{
  position: relative;
  z-index: 2;
  /deep/.van-nav-bar{
    .van-nav-bar__left{
      .back {
        height: 50%;
        vertical-align: middle;
      }
    }
    .van-nav-bar__title {
      min-width: 80%;
      max-width: 80%;
      span{
        font-family: 'Courier New', Courier, monospace;
        font-weight: bold;
      }
    }
  }
}
</style>