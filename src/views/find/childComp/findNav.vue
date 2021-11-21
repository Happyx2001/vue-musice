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
          src="~assets/icon/navbar/tinggeshiqu.png"
        >
      </template>
    </van-nav-bar>
  </navbar>
</template>

<script>
import navbar from "components/content/navbar/navbar";
export default {
  name: "findnav",
  data() {
    return {
      value:''
    };
  },
  components: { navbar },
  methods: {
    toPageSearch(){
      this.$router.push({
        path:'/search'
      })
    },
  },
};
</script>

<style lang='less' scoped>
/deep/.van-nav-bar__content{
  .UserList {
    height: 50%;
    vertical-align: middle;
  }
  .van-nav-bar__title {
    min-width: 80%;
    max-width: 80%;
    .van-search {
      padding: 0px 12px;
    }
  }
}
</style>