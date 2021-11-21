<!--歌单详情-->
<template>
  <div id="song-list">
    <song-list-nav
      :navTitle="SongInfo.songTitle"
      :position="position"
    ></song-list-nav>
    <scroll
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="load"
      @FindScrollPosition="ContentScroll"
      ref="scroll"
    >
      <simple-title
        v-if="ListType == 'todayRec'"
        :bgimgSrc="
          todayRecSongList[
            parseInt(Math.random() * (todayRecSongList.length - 1))
          ]
        "
      ></simple-title>
      <simple-title
        v-else-if="ListType == 'havePurchased'"
        :bgimgSrc="
          purchasedSong[parseInt(Math.random() * (purchasedSong.length - 1))]
        "
      ></simple-title>
      <simple-title
        v-else-if="ListType == 'recentSong'"
        :bgimgSrc="
          getrecentPlay[parseInt(Math.random() * (getrecentPlay.length - 1))]
        "
      ></simple-title>
      <song-list-title
        :songInfo="SongInfo"
        :listId="ListId"
        :listType="ListType"
        @showListDetail="showListDetail"
        @collectEvent="collectEvent"
        v-else
      ></song-list-title>
      <song
        :songIdList="SongId"
        :mediaPrograms="mediaPrograms.list"
        :todayRecSong="todayRecSongList"
        :recentSong="getrecentPlay"
        :havePurchasedSong="purchasedSong"
        :AlbumnList="AlbumnList"
        :removeSongId="removeSong"
        @showSongPanel="showSongPanel"
      ></song>
    </scroll>
    <song-detail
      :class="{ show: isShowListDetail }"
      :songInfo="SongInfo"
      @hideListDetail="hideListDetail"
      @updateListInfo="updateListInfo"
    ></song-detail>
    <van-overlay :show="isShowSongPanel" @click="hideSongPanel" />
    <song-panel
      ref="songPanel"
      :class="{ show: isShowSongPanel }"
      :curSong="curClickSong"
      :isOrder="SongInfo.isSet"
      :listId="ListId"
      @delSongInList="updataSong"
    ></song-panel>
  </div>
</template>

<script>
import scroll from "components/common/scroll/scroll.vue";
import songDetail from "views/songList/childComp/songDetail";
import songPanel from "views/songList/childComp/songPanel";
import songListNav from "views/songList/childComp/SongListNav";
import songListTitle from "views/songList/childComp/SongListTitle";
import simpleTitle from "views/songList/childComp/simpleTitle.vue";
import song from "views/songList/childComp/Song";

import {
  getSongListInfo,
  getMediaSongListInfo,
  getPrograms,
  getTodayRecSong,
  getRecentSong,
  getAlbumnList,
  updataListInfo,
  subscribe,
} from "network/songlistdetail";
import { mapActions, mapGetters } from "vuex";
import { conbination } from "utils/index";
export default {
  name: "songList",
  data() {
    return {
      // 传入的歌单id
      ListId: null,
      ListType: "",
      // 这个变量保存获取滚动信息，用来动态修改nav的颜色
      position: 0,

      // 是否展示歌单详细信息界面
      isShowListDetail: false,
      // 是否展示操作歌曲界面
      isShowSongPanel: false,
      // 当前要操作的歌曲对象
      curClickSong: {},
      // 要删除的歌曲
      removeSong: 0,

      // 歌单详情对象
      SongInfo: {
        songImg: null,
        songTitle: "",
        songCreator: {
          coverImg: "",
          nickName: "",
        },
        songListTag: [],
        songDescription: "",
        songPlayCount: 0,
        songCommentCount: 0,
        songShareCount: 0,
        songCollectCount: 0,
        isSet: false,
        isCollect: false,
      },
      // 歌单的trackids，通过这个获取歌曲
      SongId: [],
      // 所有歌曲trackids
      allSongId: [],
      // 拆分函数，每200个歌曲拆一次保存到SongId
      conbine: null,

      // 已购音乐列表
      purchasedSong: [],
      // 电台节目列表
      mediaPrograms: {
        page: 1,
        limit: 30,
        list: [],
        hasLoadAll: false,
      },
      // 最近播放歌曲列表
      recentPlay: [],
      // 每日推荐歌曲列表
      todayRecSongList: [],
      // 专辑列表
      AlbumnList: [],
    };
  },
  created() {
    this.ListId = this.$route.query.SongListId;
    this.ListType = this.$route.query.type;
    const uid = localStorage.getItem("uid");
    if (this.ListType == "media") this.getMediaSongListInfo(this.ListId);
    else if (this.ListType == "todayRec") this.getTodayRecSong();
    else if (this.ListType == "recentSong") this.getRecentSong(uid);
    else if (this.ListType == "havePurchased") this.getPurchasedSong();
    else if (this.ListType == "Albumn") this.getAlbumnList(this.ListId);
    else this.getSongListInfo(this.ListId);
  },
  computed: {
    ...mapGetters(["havePurchasedSong"]),
    getrecentPlay() {
      return this.recentPlay.map((obj) => {
        return obj.song;
      });
    },
  },
  components: {
    scroll,
    songDetail,
    songPanel,
    songListNav,
    songListTitle,
    simpleTitle,
    song,
  },
  methods: {
    ...mapActions(["setUserInfo"]),
    // 获取歌单信息
    async getSongListInfo(ListId) {
      this.$toast.loading({
        message: "加载中...",
        duration: 0,
      });
      try {
        const cookie = localStorage.getItem("cookie");
        const uid = localStorage.getItem("uid");
        const res = await getSongListInfo(ListId, cookie);
        // console.log(res);
        const data = res.playlist;
        this.SongInfo.songImg = data.coverImgUrl;
        this.SongInfo.songTitle = data.name;
        this.SongInfo.songCreator.coverImg = data.creator.avatarUrl;
        this.SongInfo.songCreator.nickName = data.creator.nickname;
        this.SongInfo.songListTag = data.tags;
        this.SongInfo.songDescription = data.description;
        this.SongInfo.songPlayCount = data.playCount;
        this.SongInfo.songCommentCount = data.commentCount;
        this.SongInfo.songShareCount = data.shareCount;
        this.SongInfo.songCollectCount = data.subscribedCount;
        this.SongInfo.isSet = data.userId == uid;
        this.SongInfo.isCollect = data.subscribed;

        if (data.trackIds.length >= 200) {
          this.allSongId = data.trackIds;
          this.conbine = conbination(this.allSongId, 200);
          this.load();
        } else this.SongId = data.trackIds;
      } catch (error) {
        this.$toast.fail({
          message: "请求数据失败，请稍后再试",
          duration: 2000,
        });
      }
    },
    async getMediaSongListInfo(ListId) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const res = await getMediaSongListInfo(ListId);
        const data = res.data;
        // this.SongInfo.songImg=data.dj.backgroundUrl
        this.SongInfo.songImg = data.picUrl;
        this.SongInfo.songTitle = data.name;
        this.SongInfo.songCreator.coverImg = data.dj.avatarUrl;
        this.SongInfo.songCreator.nickName = data.dj.nickname;
        this.SongInfo.songDescription = data.desc;
        this.SongInfo.songPlayCount = data.subCount;
        this.SongInfo.songCommentCount = data.commentCount;
        this.SongInfo.songShareCount = data.shareCount;
        this.SongInfo.songCollectCount = data.subCount;
        // console.log(data);
        const programs = await getPrograms(ListId);
        this.mediaPrograms.list = programs.programs;
        this.$toast.clear();
      } catch (error) {
        console.log(error);
      }
    },
    async getTodayRecSong() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const cookie = localStorage.getItem("cookie");
        const res = await getTodayRecSong(cookie);
        this.todayRecSongList = res.data.dailySongs;
        this.$toast.clear();
      } catch (error) {
        if (error.code == 301) {
          this.$toast.fail({
            message: "请先登录！",
            forbidClick: true,
          });
          this.$router.push({
            path: "/login",
          });
        }
        console.log(error);
      }
    },
    async getRecentSong(uid) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const cookie = localStorage.getItem("cookie");
        const res = await getRecentSong(uid, 1, cookie);
        this.recentPlay = res.weekData;
        this.$toast.clear();
      } catch (error) {
        console.log(error);
      }
    },
    async getAlbumnList(ListId) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const res = await getAlbumnList(ListId);
        // console.log(res.album);
        const data = res.album;
        this.SongInfo.songImg = data.picUrl;
        this.SongInfo.songTitle = data.name;
        this.SongInfo.songCreator.coverImg = data.artist.picUrl;
        this.SongInfo.songCreator.nickName = data.artist.name;
        this.SongInfo.songDescription = data.description;
        this.SongInfo.songPlayCount = data.playCount;
        this.SongInfo.songCommentCount = data.info.commentCount;
        this.SongInfo.songShareCount = data.info.shareCount;
        this.SongInfo.songCollectCount = data.mark;

        this.AlbumnList = res.songs;
        this.$toast.clear();
        // console.log(res.songs);
      } catch (error) {
        console.log(error);
      }
    },

    async updateListInfo(obj) {
      this.$toast.loading({
        message: "修改中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const cookie = localStorage.getItem("cookie");
        const res = await updataListInfo(
          this.ListId,
          obj.name,
          obj.desc,
          obj.tags,
          cookie
        );
        console.log(res);
        if (res.code == 200) {
          this.SongInfo.songTitle = obj.name;
          this.SongInfo.songListTag = obj.tags.split(";");
          this.SongInfo.songDescription = obj.desc;
          await this.setUserInfo();
          this.$toast.success({
            message: "修改成功",
            forbidClick: true,
            duration: 2000,
          });
        }
      } catch (error) {
        this.$toast.fail({
          message: "修改失败",
          forbidClick: true,
          duration: 2000,
        });
        console.log(error);
      }
    },
    // 处理滚动事件：动态修改nav样式
    ContentScroll(position) {
      const scroll = -position.y;
      this.position = scroll;
    },
    getPurchasedSong() {
      this.purchasedSong = this.havePurchasedSong;
    },
    // 上拉加载
    async load() {
      if (this.conbine) this.SongId = this.conbine();
      else if (this.ListType == "media") {
        if (!this.mediaPrograms.hasLoadAll) {
          this.$toast.loading({
            message: "加载中...",
            forbidClick: true,
            duration: 0,
          });
        }
        const page = this.mediaPrograms.page;
        const limit = this.mediaPrograms.limit;
        try {
          const programs = await getPrograms(this.ListId, page * limit);
          if (programs.programs.length == 0) {
            this.mediaPrograms.hasLoadAll = true;
            this.$toast.success({
              message: "已经见底了哦",
              duration: 2000,
            });
          } else {
            this.mediaPrograms.page++;
            this.mediaPrograms.list = this.mediaPrograms.list.concat(
              programs.programs
            );
            this.$toast.clear();
          }
        } catch (error) {
          console.log(error);
        }
      }

      // 不知道为什么，歌单组件keepAlive时这个方法就没用了，导致只能上拉加载一次
      this.$refs.scroll.finishPullUp();
    },
    // 展示歌单详细信息
    showListDetail() {
      this.isShowListDetail = true;
    },
    // 隐藏歌单详细信息
    hideListDetail() {
      this.isShowListDetail = false;
    },
    // 收藏事件
    async collectEvent() {
      this.$toast.loading({
        message: "收藏中...",
        forbidClick: true,
        duration: 0,
      });
      let t = 1;
      let id = this.ListId;
      const cookie = localStorage.getItem("cookie");
      if (this.SongInfo.isCollect) t = 0;
      else t = 1;
      try {
        const res = await subscribe(id, t, cookie);
        t == 1
          ? (this.SongInfo.isCollect = true)
          : (this.SongInfo.isCollect = false);
        await this.setUserInfo();
        if (t == 1) {
          this.SongInfo.isCollect = true;
          this.$toast.success({
            message: "收藏成功",
            forbidClick: true,
            duration: 2000,
          });
        } else {
          this.SongInfo.isCollect = false;
          this.$toast.success({
            message: "取消收藏成功",
            forbidClick: true,
            duration: 2000,
          });
        }
      } catch (error) {
        this.$toast.fail({
          message: error.msg,
          forbidClick: true,
          duration: 2000,
        });
      }
    },
    // 展示歌曲操作界面
    showSongPanel(obj) {
      this.isShowSongPanel = true;
      this.curClickSong = obj;
    },
    // 隐藏歌曲操作界面
    hideSongPanel() {
      // 判断是否展示了我的歌单界面，如果是就先关闭
      if (this.$refs.songPanel.showMyList)
        this.$refs.songPanel.showMyList = false;
      else this.isShowSongPanel = false;
    },
    // 已成功删除歌曲,更新歌单,传给song组件要删除的歌曲
    updataSong(songId) {
      this.removeSong = songId;
    },
  },
  beforeCreate() {
    this.$store.commit("setTabBarShow", false);
  },
  // beforeRouteLeave (to, from, next) {
  //   this.$store.commit('setTabBarShow',true)
  //   next()
  // },
  activated() {
    this.$refs.scroll.initBS();
  },
};
</script>
<style lang='less' scoped>
.wrapper {
  top: 0px;
  background-color: rgba(255, 255, 255, 0);
}
</style>