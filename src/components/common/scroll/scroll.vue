<!--  -->
<template>
  <div class="wrapper" :class="{top1:isShowPlayerNav | tabBarShow,top2:isShowPlayerNav && tabBarShow}" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

import {mapGetters} from 'vuex'
export default {
  name:'scroll',
  props:{
    probeType:{
      type:Number,
      defalult : 0
    },
    pullUpLoad:{
      type: Boolean,
      defalult: false
    },
    pullDown:{
      type:Boolean,
      defalult:false
    }
  },
  data () {
    return {
      scroll:null
    };
  },
  mounted() {
    // 初始化滚动对象
    this.initBS()

    // 监听事件
    this.scroll.on('scroll',(position)=>{
      this.$emit('FindScrollPosition',position)
    })
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    }
    if(this.pullDown){
      this.scroll.on('pullingDown',()=>{
        this.$emit('pullingDown')
      })
    }
  },
  computed:{
    ...mapGetters(['isShowPlayerNav','tabBarShow'])
  },
  methods: {
    initBS(){
      this.scroll=new BScroll(this.$refs.wrapper,{
        observeDOM:true,
        observeImage:true,
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad,
        scrollX:true,
        pullDownRefresh:this.pullDown
      })
    },
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    finishPullDown(){
      this.scroll && this.scroll.finishPullDown()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    scrollToElement(el,time){
      this.scroll && this.scroll.scrollToElement(el,time)
    }
  },
}
</script>
<style lang='less' scoped>
.wrapper{
  background-color: #F5F5F5;
  overflow: hidden;
  position: absolute;
  top: 46px;
  bottom: 0px;
  left: 0;
  right: 0;
  /* 底部是否有导航栏和mini播放器，有则修改滚动容器样式*/
  &.top1{
    bottom: 50px;
  }
  /*底部有导航栏和mini播放器之一时，修改滚动容器*/
  &.top2{
    bottom:100px !important;
  }
}
// /* 底部是否有导航栏和mini播放器，有则修改滚动容器样式*/
// .top2{
//   bottom:100px !important;
// }
// /*底部有导航栏和mini播放器之一时，修改滚动容器*/
// .top1{
//   bottom: 50px;
// }
</style>