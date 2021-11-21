<!--评论页面-->
<template>
  <div id="comment" :class="{show:showComment,video:requestObj.type==5}">
    <comment-nav :totalCount='cummentObj.totalCount'></comment-nav>
    <comment-tab @itemClick='tabClick' :showTab='showTab' ref="commentTab1" v-show="isShowCommentTab1"></comment-tab>
    <scroll
    :probe-type="3"
    :pull-up-load='true'
    @pullingUp='loadMore'
    @FindScrollPosition='ContentScroll'
    class="scroll"
    ref="scroll">
    <comment-title :curPlayMusic='curCommentObj.curMusic' :curSongList='curCommentObj.curSongList' :curMediaList='curCommentObj.curMedia'></comment-title>
    <comment-tab @itemClick='tabClick' :showTab='showTab' ref="commentTab2"></comment-tab>
    <comment-detail :commentList='cummentObj.list'></comment-detail>
    </scroll>
  </div>
</template>

<script>
import commentNav from 'views/comment/childComp/commentNav.vue'
import commentTitle from 'views/comment/childComp/commentTitle.vue'
import commentTab from 'views/comment/childComp/commentTab.vue'
import commentDetail from 'views/comment/childComp/commentList.vue'

import scroll from 'components/common/scroll/scroll.vue'
import {mapGetters} from 'vuex'
import {getCommentText} from 'network/comment'
export default {
  name:'Comment',
  data () {
    return {
      cummentObj:{
        totalCount:0,
        list:[]
      },
      requestObj:{
        id:null,
        type:null,
        pageNo:1,
        pageSize:40,
        sortType:99,
        cursor:null
      },
      hasMore:true,

      tabControlOffsetTop:0,
      isShowCommentTab1:false
    };
  },
  computed:{
    ...mapGetters(['showComment','curCommentObj','curPlayMusic']),
    getCurCommentObjId(){
      return this.curCommentObj.id
    },
    getCurCommentObjtype(){
      return this.curCommentObj.type 
    },
    showTab(){
      return this.cummentObj.list.length!==0
    }
  },
  watch:{
    // 这里监听对象的话每次点击都会执行方法，即使对象的值一样
    getCurCommentObjId(newvalue){
      this.requestObj.id=newvalue
      this.requestObj.type=this.getCurCommentObjtype
      // 每次切换重置当前评论页面
      this.requestObj.pageNo=1
      // 每次在切换评论对象时重新在推荐开始
      this.requestObj.sortType=99
      this.$nextTick(()=>{
        this.$refs.commentTab1.currentIndex=0
        this.$refs.commentTab2.currentIndex=0
        this.tabControlOffsetTop=this.$refs.commentTab2.$el.offsetTop;
          // 切换时重置滚动位置
        this.$refs.scroll.scrollTo(0,0)
      })
      this.getCommentText(this.requestObj,true)
    },
    showComment(){
      this.$nextTick(()=>{
        this.$refs.scroll.refresh()
      })
    }
  },
  components: {scroll,commentNav,commentTitle,commentTab,commentDetail},
  methods: {
    async getCommentText(obj,isTabClick=false){
      const id=obj.id
      const type=obj.type
      const pageNo=obj.pageNo
      const pageSize=obj.pageSize
      const sortType=obj.sortType
      const cursor=obj.cursor
      this.$toast.loading({
        message: '加载中...',
        duration:0
      })
      try {
        const res=await getCommentText(id,type,pageNo,pageSize,sortType,cursor)
        console.log(res);
        this.hasMore=res.data.hasMore
        this.cummentObj.totalCount=res.data.totalCount
        this.requestObj.pageNo++
        // 这里判断是不是按时间排序，如果是则传cursor属性，不是就清空该属性
        if(obj.sortType==3)
          this.requestObj.cursor=res.data.cursor
        else
          this.requestObj.cursor=null

        // 这里判断是否切换了排序方式
        if(!isTabClick)
          this.cummentObj.list=this.cummentObj.list.concat(res.data.comments)
        else
          this.cummentObj.list=res.data.comments
        this.$toast.clear()
      } catch (error) {
        this.$toast.fail({
          message: '请求失败:(接口参数sortType为99不行，1也不行，实在没办法）',
          duration:2000
        })
        console.log(error);
      }
    },
    tabClick(index){
      this.$refs.commentTab1.currentIndex=index
      this.$refs.commentTab2.currentIndex=index
      this.$refs.scroll.scrollTo(0,-this.tabControlOffsetTop)
      switch(index){
        case 0:
          this.requestObj.sortType=99
          break;
        case 1:
          this.requestObj.sortType=2
          break;
        case 2:
          this.requestObj.sortType=3
          break;
      }
      this.requestObj.pageNo=1
      this.getCommentText(this.requestObj,true)
    },
    loadMore(){
      // 接口有点问题，sortType为1时第一次有时候会请求不到数据，改为99才能
      // 后面每次加载的时候sortType为99也不能请求到
      // 所以想法是在加载情况下判断SortType是否为99,如果是就修改为1
      if(this.hasMore){
        if(this.requestObj.sortType==99)
          this.requestObj.sortType=1
        this.getCommentText(this.requestObj)
      }
      else{
        this.$toast.fail({
          message: '暂无评论',
          duration:2000
        })
      }
      this.$refs.scroll.finishPullUp()
    },
    ContentScroll(position){
      this.isShowCommentTab1=-position.y>this.tabControlOffsetTop
    }
  }
}

</script>
<style lang='less' scoped>
#comment{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #fff;
  transition: all .3s;
  transform: translate(0, 100%);
  opacity: 0.3;
  .scroll{
    bottom: 0;
  }
  &.show{
    display: block;
    transition: all .3s;
    transform: translate(0,0%);
    opacity: 1;
  }
  &.video{
    top: 40%;
  }
}
</style>