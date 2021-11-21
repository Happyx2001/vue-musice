<!--我的-->
<template>
  <div id="profile">
    <profile-nav></profile-nav>
    <tab-control :titles="['创建歌单','收藏歌单']" @tabClick='tabClick' ref='tab1' v-show='isShowCommentTab1' class="tab1"></tab-control>
    <scroll
    :probe-type="3"
    :pull-up-load='false'
    @FindScrollPosition='ContentScroll'
    ref='scroll'>
      <login-info :userInfo='userAccount'></login-info>
      <my-panel></my-panel>
      <like-song :LikeListSong='userAddList[0]'></like-song>

      <tab-control v-if="hasLogin" :titles="['创建歌单','收藏歌单']" @tabClick='tabClick' ref='tab2'></tab-control>
      <add-song-list :AddList='userAddList' class="set-scroll"></add-song-list>
      <col-song-list :collectList='userCollectList' class="set-scroll"></col-song-list>
      <div class="btn">
        <button @click="LogoutThenUpdataStatus">退出登录/关闭</button>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from 'components/common/scroll/scroll.vue'
import profileNav from 'views/profile/childComp/profileNav'
import loginInfo from 'components/common/login/loginInfo'
import myPanel from 'views/profile/childComp/myPanel.vue'
import tabControl from 'components/content/tabControl/tabControl.vue'
import likeSong from 'views/profile/childComp/myfavoriteSong'
import addSongList from 'views/profile/childComp/addSongList'
import colSongList from 'views/profile/childComp/collectSongList'
// import havePurchased from 'views/profile/childComp/havePurchased.vue'

import {logout} from 'network/login'

import {mapMutations,mapGetters,mapActions} from "vuex";
export default {
  name:'profile',
  data () {
    return {
      isShowCommentTab1:false,
      tabControlOffsetTop:0,
      detailClassList:[]
    };
  },
  components: {scroll,profileNav,loginInfo,myPanel,tabControl,likeSong,addSongList,colSongList},
  computed: {
    ...mapGetters(['havePurchasedSong','userAccount','userAddList','userCollectList','hasLogin'])
  },
  // created() {
  //   this.setUserInfo()
  // },
  // watch:{
  //   userAccount(){
  //     this.$nextTick(()=>{
  //       this.tabControlOffsetTop=this.$refs.tab2.$el.offsetTop;
  //       this.getClassList()
  //     })
  //   }
  // },
  methods: {
    ...mapMutations(["updateLoginStatus"]),
    ...mapActions(['setUserInfo']),
    async LogoutThenUpdataStatus(){
      try {
        // const cookie=localStorage.getItem('cookie')
        await logout()
        localStorage.removeItem('cookie')
        this.setUserInfo()
      } catch (error) {
        console.log(error);
      }
    },
    ContentScroll(position){
      let detailPosition=position?-position.y:0
      this.isShowCommentTab1=-position.y>this.tabControlOffsetTop
      // 处理滚动时导航栏响应事件
      for(let i=0 ; i<this.detailClassList.length ; i++){
        if(detailPosition>=this.detailClassList[i].offsetTop && detailPosition<this.detailClassList[i+1].offsetTop){
          if(this.detailIndex!=i){
            this.detailIndex=i
            try {
              this.$refs.tab1.currentIndex=this.detailIndex
              this.$refs.tab2.currentIndex=this.detailIndex
            } catch (err){
              console.log(err);
            }
          }
          break;
        }
      }
    },
    // 获得框框定位高度
    getClassList() {
      // Array.from() 将伪数组转换成纯数组
      this.detailClassList = Array.from(document.getElementsByClassName("set-scroll"));
      let maxValue = 10000000;
      this.detailClassList.push({ offsetTop: maxValue });
      console.log(this.detailClassList);
    },
    tabClick(index){
      this.$refs.tab1.currentIndex=index
      this.$refs.tab2.currentIndex=index
      this.$nextTick(()=>{
        let el=document.getElementsByClassName('set-scroll')
        this.$refs.scroll.scrollToElement(el[index]);
      })
    },
  },
  activated() {
    this.$store.commit('setTabBarShow',true)
    this.$nextTick(()=>{
      this.tabControlOffsetTop=this.$refs.tab2.$el.offsetTop;
      this.getClassList()
      this.$refs.scroll.refresh()
    })
  },
}

</script>
<style lang='less' scoped>
#profile{
  .btn{
      margin: 10px 15px;
      button{
      width: 100%;
      height:50px;
      outline: none;
      font-size: 16px;
      color: brown;
      font-weight: 400;
      border: none;
      border-radius: 10px;
      background-color: #fff;
      &:active{
        background-color: #f5f5f5;
      }
    }
  }
  .tab1{
    background-color: #fff;
    position: relative;
    z-index: 998;
  }
  // .tab2{
  //   /deep/.van-tabs__nav{
  //     background-color: #f5f5f5;
  //   }
  // }
}
</style>