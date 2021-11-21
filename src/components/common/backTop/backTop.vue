<!--返回顶部-->
<template>
  <div class='back-top' :class="{toTop:isShowPlayerNav}">
    <img src="~assets/icon/backtop/top.png">
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name:'backtop',
  data () {
    return {
    };
  },
  computed:{
    ...mapGetters(['isShowPlayerNav'])
  }
}

</script>
<style scoped>
.back-top{
  position: fixed;
  z-index: 999;
  display: inline-block;
  bottom: 50px;
  right: 10px;
}
.toTop{
  bottom: 120px;
}
img{
  width: 60px;
}
</style>