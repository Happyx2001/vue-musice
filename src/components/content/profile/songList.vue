<!--创建和收藏的歌单-->
<template>
  <div id="menu">
    <slot name="title"></slot>
    <slot name="song-list"></slot>
  </div>
</template>

<script>
export default {
  name:'userSongList',
  data () {
    return {
    };
  },

  components: {},
}

</script>
<style lang='less' scoped>
#menu{
  margin: 10px 15px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 0px 15px;
}
</style>