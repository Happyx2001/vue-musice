<!--搜索具体信息-->
<template>
  <div id="search-detail" ref='searchDetail'>
    <van-tabs v-model:active="curTabClickName" @click="tabClick" animated>
      <van-tab v-for="(item,index) in title" :key="index" 
      :title="item">
        <scroll
        :probe-type="3"
        :pull-up-load='true'
        @pullingUp='loadMore'
        @FindScrollPosition='ContentScroll'
        class="scroll"
        ref="scroll">
          <search-list :searchData='searchData' v-if="curTabClickName==index"></search-list>
        </scroll>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import scroll from 'components/common/scroll/scroll.vue'
import searchList from 'views/search/childComp/searchList.vue'
import {getSearchDetail} from 'network/search'
export default {
  name:'searchDetail',
  data () {
    return {
      title:['单曲','歌单','电台','视频'],
      KeyWord:'',
      searchData:{
        type:1,
        list:[]
      },

      curTabClickName:0,
      curTabClickType:1
    };
  },
  watch:{
    '$route' (to, from) {   //监听路由是否变化
      if(to.query.hasOwnProperty('word')){
        // this.$emit('saveWord',this.KeyWord)
        this.KeyWord=to.query.word
        this.getSearchDetail(this.KeyWord,this.curTabClickType)
      }
    },
  },
  components: {searchList,scroll},
  methods: {
    tabClick(name,title){
      switch(name){
        case 0:
          this.curTabClickName=0
          this.curTabClickType=1
          this.getSearchDetail(this.KeyWord,1)
          break;
        case 1:
          this.curTabClickName=1
          this.curTabClickType=1000
          this.getSearchDetail(this.KeyWord,1000)
          break;
        case 2:
          this.curTabClickName=2
          this.curTabClickType=1009
          this.getSearchDetail(this.KeyWord,1009)
          break;
        case 3:
          this.curTabClickName=3
          this.curTabClickType=1014
          this.getSearchDetail(this.KeyWord,1014)
          break;
      }
      // console.log(name)
      // console.log(title);
    },
    async getSearchDetail(keywords,type,limit){
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration:0
      })
      try {
        const res=await getSearchDetail(keywords,type,limit)
        this.searchData.type=type
        if(type==1)
          this.searchData.list=res.result.songs
        else if(type==1000)
          this.searchData.list=res.result.playlists
        else if(type==1009)
          this.searchData.list=res.result.djRadios
        else if(type==1014){
          this.searchData.list=res.result.videos
          console.log(res.result.videos);
        }
        this.$toast.clear()
      } catch (error) {
        console.log(error);
      }
    },
    loadMore(){

    },
    ContentScroll(){

    }
  },
  activated() {
    this.KeyWord=this.$route.query.word
    this.getSearchDetail(this.KeyWord,this.curTabClickType)
    this.$emit('saveWord',this.KeyWord)
    this.$store.commit('setTabBarShow',false)
  },
  deactivated() {
    this.KeyWord=''
  },
}

</script>
<style lang='less' scoped>
#search-detail{
  height: calc(~"100% - 46px");
  .van-tabs{
    height: 100%;
    /deep/.van-tabs__content{
      height: calc(~"100% - 44px");
    }
  }
  .scroll{
    top: 0px;
  }
}
</style>