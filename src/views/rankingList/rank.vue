<!--排行榜-->
<template>
  <div id="ranking-list">
    <rank-list-nav></rank-list-nav>
    <scroll
    :probe-type="3"
    :pull-up-load='false'
    ref="scroll">
      <rank-list :rankList='rankList'></rank-list>
    </scroll>
  </div>
</template>

<script>
import scroll from 'components/common/scroll/scroll.vue'
import rankListNav from 'views/rankingList/childComp/rankListNav.vue'
import rankList from 'views/rankingList/childComp/rankList.vue'
import {getRankList} from 'network/rankList'
export default {
  name:'rankingList',
  data () {
    return {
      rankList:[]
    };
  },
  components: {scroll,rankListNav,rankList},
  created() {
    this.getRankList()
  },
  methods: {
    getRankList(){
      getRankList().then(res=>{
        // console.log(res.list);
        this.rankList=res.list
      })
    }
  },
  activated() {
    this.$store.commit('setTabBarShow',false)
    this.$refs.scroll.initBS()
  },
}

</script>
<style lang='less' scoped>
</style>