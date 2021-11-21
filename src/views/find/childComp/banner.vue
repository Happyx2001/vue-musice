<!--轮播图-->
<template>
  <div v-if="reRender">
    <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in img" :key="index">
        <div class="imgBox">
          <img :src="item.pic">
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name:'banner',
  props:{
    img:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {
       reRender: false
    };
  },
  components: {}
}
</script>

<style lang='less' scoped>
.my-swipe{
  background-color: #ffffff;
  .imgBox{
    padding: 0 15px;
    box-sizing: border-box;
    img{
      width: 100%;
      border-radius: 10px;
    }
  }
}
</style>