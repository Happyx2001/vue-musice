<!--头部-->
<template>
  <div id="comment-nav">
    <navbar>
      <van-nav-bar @click-left="hideComment">
        <template #left>
          <img class='back' src="~assets/icon/comment/back_black.png">
        </template>
        <template #title>
          <span>评论({{totalCount}})</span>
        </template>
        <template #right>
          <img class='share' src="~assets/icon/comment/share_black.png" alt="">
        </template>
      </van-nav-bar>
    </navbar>
  </div>
</template>

<script>
import navbar from "components/content/navbar/navbar";
export default {
  name:"commentNav",
  props:{
    totalCount:{
      type:Number,
      default:0
    }
  },
  data () {
    return {
    };
  },
  components: {navbar},
  methods: {
    hideComment(){
      this.$store.commit('updataShowComment',false)
    }
  },
}

</script>
<style lang='less' scoped>
/deep/.van-nav-bar{
  background-color: #fff;
  .van-nav-bar__content{
    .van-nav-bar__left{
      .back{
        height: 50%;
        vertical-align: middle;
      }
    }

    .van-nav-bar__title{
      span{
        color: #333;
        font-size: 16px;
        font-weight: bold;
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