<!--所有歌单-->
<template>
  <div id="all-list">
    <all-list-nav></all-list-nav>
    <category :species='category' @itemClick='navClick' @moreClick='moreClick' ref="category"></category>
    <scroll
    :probe-type="3"
    :pull-up-load='true'
    @pullingUp='loadMore'
    class="scroll"
    ref="scroll">
      <play-list :playlist='songList.list'></play-list>
    </scroll>
    <van-overlay :show="show" @click="overLayClick" />
  </div>
</template>

<script>
import scroll from 'components/common/scroll/scroll.vue'
import allListNav from 'views/allSongList/childComp/allListNav.vue'
import Category from 'components/content/category/category.vue'
import playList from 'views/allSongList/childComp/playList.vue'

import {getCategory,getList} from 'network/allList'
export default {
  name:'allList',
  data () {
    return {
      category:[],

      songList:{
        page:0,
        limit:51,
        list:[]
      },

      currentClickName:'',

      show:false
    };
  },
  created() {
    this.getCategory()
  },
  components: {scroll,allListNav,Category,playList},
  methods: {
    getCategory(){
      getCategory().then(res=>{
        this.category=res.sub

        this.currentClickName=res.sub[0].name

        this.navClick(this.currentClickName)
        // console.log(res.sub)
      })
    },
    async navClick(cat){
      this.show=false
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration:0
      })
      
      if(cat!==this.currentClickName){
        this.songList.page=0
        this.$refs.scroll.scrollTo(0,0,500)
      }
      const page=this.songList.page
      const limit=this.songList.limit
      try {
        const res=await getList(cat,limit,(page*limit))
        this.songList.page++
        if(cat==this.currentClickName)
          this.songList.list=this.songList.list.concat(res.playlists)
        else
          this.songList.list=res.playlists
        this.currentClickName=cat

        this.$toast.clear()
      } catch (error) {
        console.log(error);
      }
    },
    // 加载更多
    loadMore(){
      this.navClick(this.currentClickName)
      this.$refs.scroll.finishPullUp()
    },

    // 点击导航栏右侧更多按钮弹出遮罩层
    moreClick(){
      this.show=!this.show
    },
    // 点击遮罩层
    overLayClick(){
      this.show=false
      this.$refs.category.showMore=false
    }
  },
  activated() {
    this.$store.commit('setTabBarShow',false)
    this.$refs.scroll.refresh()
  },
}

</script>
<style lang='less' scoped>
.scroll{
  top:89px;
}
.van-overlay{
  z-index: 0;
}
</style>