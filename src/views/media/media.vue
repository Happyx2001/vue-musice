<!--media-->
<template>
  <div id="media">
    <media-nav></media-nav>
    <scroll
    :probe-type="3"
    :pull-up-load='false'
    class="scroll"
    ref="scroll">
      <media-category v-if="RouterType=='category'"></media-category>
      <media-rec v-else></media-rec>
    </scroll>
  </div>
</template>

<script>
import scroll from 'components/common/scroll/scroll.vue'
import mediaNav from 'views/media/childComp/mediaNav'
import mediaRec from 'views/media/mediaRec'
import mediaCategory from 'views/media/mediaCategory'

import {mapGetters,mapMutations} from 'vuex'
export default {
  data () {
    return {
    };
  },
  computed:{
    ...mapGetters(['RouterType'])
  },
  created() {
    // 用于刷新页面保持状态
    this.setRouterType(this.$route.query.type)
  },
  components: {scroll,mediaCategory,mediaRec,mediaNav},
  methods: {
    ...mapMutations(['setRouterType'])
  },
  activated() {
    this.$store.commit('setTabBarShow',true)
    this.$refs.scroll.initBS()
  },
}

</script>
<style lang='less' scoped>
</style>