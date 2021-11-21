<template>
  <player></player>
  <video-player></video-player>
  <mini-player></mini-player>
  <comment></comment>
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component
        :is="Component"
        :key="route.path"
        v-if="route.meta.keepAlive"
      />
    </keep-alive>
    <component
      :is="Component"
      v-if="!route.meta.keepAlive"
    />
  </router-view>
  <maintabbar v-show="$store.getters.tabBarShow"></maintabbar>
</template>

<script>
import Maintabbar from "components/common/tabbar/maintabbar";
import MiniPlayer from "views/player/playMini";

import player from "views/player/player";
import videoPlayer from "views/videoPlayer/videoPlayer.vue";

import Comment from 'views/comment/comment.vue'

import {mapActions} from 'vuex'
export default {
  name: "app",
  components: {
    Maintabbar,
    player,
    MiniPlayer,
    videoPlayer,
    Comment
  },
  created() {
    this.setUserInfo()
  },
  methods: {
    ...mapActions(["setUserInfo"]),
  },
};
</script>
<style lang="less">
html,
body,
#app {
  height: 100%;
  width: 100%;
}
// @keyframes slideInLeft {
//   from {
//     transform: translate3d(100%, 0, 0);
//     position: fixed;
//     top: 0;
//     left: 0;
//     opacity: 1;
//   }
//   to {
//     transform: translate3d(0, 0, 0);
//     position: fixed;
//     top: 0;
//     left: 0;
//     opacity: 1;
//   }
// }
// @keyframes slideInRight {
//   from {
//     transform: translate3d(0%, 0, 0);
//     position: fixed;
//     top: 0;
//     left: 0;
//     opacity: 1;
//   }
//   to {
//     transform: translate3d(-100%, 0, 0);
//     position: fixed;
//     top: 0;
//     left: 0;
//     opacity: 1;
//   }
// }
// .slide-left-enter-active {
//   position: fixed;
//   top: 0;
//   left: 0%;
//   width: 100vw;
//   height: 100vh;
//   animation: slideInLeft 0.1s linear forwards;
// }
// .slide-left-leave-active {
//   position: fixed;
//   top: 0;
//   left: 0%;
//   width: 100vw;
//   height: 100vh;
//   animation: slideInRight 0.1s linear forwards;
// }
// /*向右滑动*/
// @keyframes slideOutLeft {
//   from {
//     transform: translate3d(-100%, 0, 0);
//     position: fixed;
//     top: 0;
//     left: 0;
//     opacity: 1;
//   }
//   to {
//     transform: translate3d(0%, 0, 0);
//     position: fixed;
//     top: 0;
//     left: 0;
//     opacity: 1;
//   }
// }
// @keyframes slideOutRight {
//   from {
//     transform: translate3d(0%, 0, 0);
//     position: fixed;
//     top: 0;
//     left: 0;
//     opacity: 1;
//   }
//   to {
//     transform: translate3d(100%, 0, 0);
//     position: fixed;
//     top: 0;
//     left: 0;
//     opacity: 1;
//   }
// }
// .slide-right-enter-active {
//   position: fixed;
//   top: 0;
//   left: 0%;
//   width: 100vw;
//   height: 100vh;
//   animation: slideOutLeft 0.1s linear forwards;
// }
// .slide-right-leave-active {
//   position: fixed;
//   top: 0;
//   left: 0%;
//   width: 100vw;
//   height: 100vh;
//   animation: slideOutRight 0.1s linear forwards;
// }
</style>
