<!--导航栏-->
<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index" 
    class="tabControl-item" 
    :class="{active:index==currentIndex}"
    @touchstart='itemClick(index)'>
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'tabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {
      currentIndex:0
    };
  },
  methods: {
    itemClick(index){
      // console.log(index);
      this.currentIndex=index
      this.$emit('tabClick',index)
    }
  },
}

</script>
<style lang='less' scoped>
.tab-control{
  width: 100%;
  display: flex;
  .tabControl-item{
    flex: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    span{
      padding: 2px;
      font-size: 16px;
      font-weight: 600;
    }
    &.active span{
    border-bottom: 3px solid red;
    }
  }

}
// .active span{
//   border-bottom: 3px solid red;
// }
</style>