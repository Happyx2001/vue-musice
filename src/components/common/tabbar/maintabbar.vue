
<template>
  <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000" route>
    <van-tabbar-item replace to="/find">
      <span>发现</span>
      <template #icon="props">
        <img :src="props.active ? find.active : find.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace :to="{ path: '/media', query: { type:$store.state.media.RouterType }}">
      <span>播客</span>
      <template #icon="props">
        <img :src="props.active ? media.active : media.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/communicate">
      <span>云村</span>
      <template #icon="props">
        <img :src="props.active ? communicate.active : communicate.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/profile">
      <span>我的</span>
      <template #icon="props">
        <img :src="props.active ? profile.active : profile.inactive" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>

const findIcon=require("assets/icon/tabbar/find.png")
const findIconActive=require("assets/icon/tabbar/find_active.png")

const mediaIcon=require("assets/icon/tabbar/media.png")
const mediaIconActive=require("assets/icon/tabbar/media_active.png")

const profileIcon=require("assets/icon/tabbar/profile.png")
const profileIconActive=require("assets/icon/tabbar/profile_active.png")

const communicateIcon=require("assets/icon/tabbar/communicate.png")
const communicateIconActive=require("assets/icon/tabbar/communicate_active.png")


export default {
  name: 'maintabbar',
  data() {
    return {
      active:0,

      find:{
        active: findIconActive,
        inactive: findIcon,
      },
      media:{
        active: mediaIconActive,
        inactive: mediaIcon,
      },
      profile:{
        active: profileIconActive,
        inactive: profileIcon,
      },
      communicate:{
        active: communicateIconActive,
        inactive: communicateIcon,
      }
    }
  }
  // setup() {
  //   const active = ref(0);
  //   const find = {
  //     active: findIconActive,
  //     inactive: findIcon,
  //   };
  //   const media={
  //     active: mediaIconActive,
  //     inactive: mediaIcon,
  //   };
  //   const profile={
  //     active: profileIconActive,
  //     inactive: profileIcon,
  //   };
  //   const communicate={
  //     active: communicateIconActive,
  //     inactive: communicateIcon,
  //   }
  //   return {
  //     find,media,profile,communicate,
  //     active,
  //   };
  // },
}
</script>

<style lang='less' scoped>
</style>
