<!--横向滚动-->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'rowScroll',
  props:{
    probeType:{
      type:Number,
      defalult : 0
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
  },
  methods: {
    initBS(){
      this.$nextTick(()=>{
        this.scroll=new BScroll(this.$refs.wrapper,{
          observeDOM:true,
          observeImage:true,
          click:true,
          probeType:this.probeType,
          pullUpLoad:this.pullUpLoad,
          scrollX:true,
          scrollY:false
        })
      })
      // console.log(this.scroll);
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
  },
}

</script>
<style lang='less' scoped>
.content{
  display: inline-flex;
}
</style>