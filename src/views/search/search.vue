<!--搜索页面-->
<template>
  <div id="search">
    <search-nav ref="searchNav"></search-nav>
    <router-view ref='searchDetail' @hotItemClick='hotItemClick' @saveWord='saveWord' v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="route.fullPath" v-if="route.meta.keepAlive"/>
      </keep-alive>
      <component :is="Component" v-if="!route.meta.keepAlive"/>
    </router-view>
    <!-- <hot-search :hotSearchData='HotSearchData'></hot-search> -->
  </div>
</template>

<script>
import searchNav from 'views/search/childComp/searchNav.vue'
// import hotSearch from 'views/search/childComp/hotSearch.vue'
export default {
  name:'search',
  data () {
    return {
    };
  },
  components: {searchNav},
  methods: {
    hotItemClick(word){
      this.$refs.searchNav.value=word
      this.$refs.searchNav.search()
    },
    saveWord(word){
      this.$nextTick(()=>{
        this.$refs.searchNav.value=word
      })
    }
  },
  beforeCreate() {
    this.$store.commit('setTabBarShow',false)
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('setTabBarShow',true)
    next()
  },
}

</script>
<style lang='less' scoped>
#search{
  height: 100%;
}
</style>