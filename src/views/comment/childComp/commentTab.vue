<!--tab标签栏-->
<template>
  <div id="comment-tab">
    <span class="text" v-show="showTab">评论区</span>
    <div class="sort-type" v-show="showTab">
      <span v-for="(item,index) in title" :key="index"
      :class="{active:index==currentIndex}"
      @click="itemClick(index)">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'commentTab',
  props:['showTab'],
  data () {
    return {
      title:['推荐','最热','最新'],
      currentIndex:0
    };
  },
  components: {},
  methods: {
    itemClick(index){
      this.currentIndex=index
      this.$emit('itemClick',index)
    }
  },
}

</script>
<style lang='less' scoped>
#comment-tab{
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px;
  z-index: 999;
  position: relative;
  .text{
    font-size: 14px;
    font-weight: bold;
  }
  .sort-type{
    span{
      padding: 0 10px;
      font-size: 12px;
      color: #999;
      font-weight: bold;
      border-right: 1px solid rgba(0, 0, 0, 0.1);
      &:nth-child(3){
        border: none;
      }
      &.active{
        color: #333;
      }
    }
  }
}
</style>