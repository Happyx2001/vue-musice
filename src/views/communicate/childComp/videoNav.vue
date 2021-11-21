<!--导航栏-->
<template>
  <navbar>
    <van-nav-bar>
      <template #left>
        <img
          class='UserList'
          src="~assets/icon/navbar/list.png"
        >
      </template>
      <template #title>
        <van-search
          v-model="value"
          shape="round"
          placeholder="请输入搜索关键词"
          @focus='toPageSearch'
        />
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
export default {
  name:'videoNav',
  data () {
    return {
      value:''
    };
  },
  components: {navbar},
  methods: {
    toPageSearch(){
      this.$router.push({
        path:'/search'
      })
    },
  },
}

</script>
<style lang='less' scoped>
.nav-bar{
  position: relative;
  z-index: 2;
  .UserList {
    height: 50%;
    vertical-align: middle;
  }
  /deep/.van-nav-bar__title {
    min-width: 80%;
    max-width: 80%;
    /deep/.van-search {
      padding: 0px 12px;
    }
  }
}
</style>