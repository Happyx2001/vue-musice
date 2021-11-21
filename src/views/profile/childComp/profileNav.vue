<!--顶部导航栏-->
<template>
  <navbar>
    <van-nav-bar>
      <template #left>
        <img class='UserList' src="~assets/icon/navbar/list.png">
      </template>
    </van-nav-bar>
  </navbar>
</template>

<script>
import navbar from "components/content/navbar/navbar";
export default {
  name:'profileNav',
  data () {
    return {
    };
  },
  components: {navbar},
}

</script>
<style lang='less' scoped>
.UserList {
  height: 50%;
  vertical-align: middle;
}
</style>