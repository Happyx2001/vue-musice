<!--博客顶部导航栏-->
<template>
  <navbar>
    <van-nav-bar>
      <template #left>
        <img class='UserList' src="~assets/icon/navbar/list.png"
        >
      </template>
      <template #title>
        <tabControl :titles="['推荐','分类']" @tabClick='itemClick' ref="tabControl"></tabControl>
      </template>
      <template #right>
        <img
          class="UserList"
          src="~assets/icon/navbar/add.png"
        >
      </template>
    </van-nav-bar>
  </navbar>
</template>

<script>
import navbar from "components/content/navbar/navbar";

import tabControl from 'components/content/tabControl/tabControl'
import {mapMutations,mapGetters} from 'vuex'
export default {
  name:'mediaNav',
  data () {
    return {
      currentClick:'recommend'
    };
  },
  computed:{
    ...mapGetters(['RouterType'])
  },
  mounted() {
    if(this.RouterType=='category')
      this.$refs.tabControl.currentIndex=1
    else
      this.$refs.tabControl.currentIndex=0
  },
  components: {navbar,tabControl},
  methods: {
    ...mapMutations(['setRouterType']),
    itemClick(index){
      if(index==0)
        this.currentClick='recommend'
      else
        this.currentClick='category'
      this.setRouterType(this.currentClick)
      this.$router.push({
        path:'/media',
        query:{
          type:this.currentClick
        }
      })
    }
  },
}

</script>
<style lang='less' scoped>
/deep/.van-nav-bar__content{
  .UserList {
    height: 50%;
    vertical-align: middle;
  }
  .van-nav-bar__title {
    min-width: 30%;
    max-width: 30%;
    .van-search {
      padding: 0px 12px;
    }
  }
}
</style>