<!--每日推荐-->
<template>
  <div id="today-rec-title">
    <img :src='bgimgSrc.al.picUrl' v-if="bgimgSrc.hasOwnProperty('al')">
    <img :src="bgimgSrc.picUrl" v-else>
  </div>
</template>
<script>
export default {
  name:'simpleTitle',
  props:{
    bgimgSrc:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data () {
    return {
    };
  },
  components: {},
}

</script>
<style lang='less' scoped>
#today-rec-title{
  width: 100%;
  height: 280px;
  background-color: #F5F5F5;
  overflow: hidden;
  display: flex;
  justify-content: center;
  img{
    width: 100%;
    object-fit: cover;
  }
}
</style>