<!--顶部-->
<template>
 <navbar>
    <van-nav-bar @click-left.stop="hidePlayer">
      <template #left>
        <img class='back' src="~assets/icon/songlist/direction-left.png">
      </template>
      <!-- <template #title>
      </template>
      <template #right>
      </template> -->
    </van-nav-bar>
  </navbar>
</template>

<script>
import navbar from "components/content/navbar/navbar";

import {mapActions, mapMutations} from 'vuex'
export default {
  name:'playNav',
  data () {
    return {
    };
  },
  components: {navbar},
  methods: {
    ...mapActions(['ShowVideoPlayer']),
    ...mapMutations(['updataCurPlayVideoList','updataShowComment']),
    hidePlayer(){
      this.ShowVideoPlayer(false)
      this.updataShowComment(false)
    }
  },
}

</script>
<style lang='less' scoped>
/deep/.van-nav-bar{
  background-color: rgba(0, 0, 0, 0);
  .van-nav-bar__content{
    min-height: 50px;
    .van-nav-bar__left{
      .back{
        height: 50%;
        vertical-align: middle;
      }
    }
  }
  &.van-hairline--bottom::after{
    border: none;
  }
}
</style>