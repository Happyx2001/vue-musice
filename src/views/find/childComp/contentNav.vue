<!--圆角图标入口列表-->
<template>
  <div id="content_nav">
    <div class="nav-item" v-for="(item,index) in icon.slice(0,4)" :key="index" @click="itemClick(item.id)">
      <img :src="item.iconUrl">
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script>

import rowScroll from 'components/common/scroll/rowScroll.vue'

import {mapMutations,mapActions} from 'vuex'
export default {
  name:'contentNav',
  props:{
    icon:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {
      tId:null
    };
  },
  components: {rowScroll},
  methods: {
    ...mapMutations(['updateShowPlayer']),
    ...mapActions(['getPersonerFM','showPlayer']),
    itemClick(id){
      window.clearTimeout(this.tId)
      this.tId=window.setTimeout(()=>{
        switch(id){
          case -1:
            this.$router.push({
              path:'/songList',
              query:{
                type:'todayRec'
              }
            })
            break;
          case -6:
            this.showPlayer(true)
            this.getPersonerFM()
            break;
          case -2:
            this.$router.push({
              path:'/allSongList'
            })
            break;
          case -3:
            this.$router.push({
              path:'/rankingList'
            })
            break;
        }
      },0)
    },
  },
}
</script>

<style lang='less' scoped>
#content_nav{
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 15px 0;
  border-bottom: 1px solid rgba(128, 128, 128, 0.1);
  background-color: #ffffff;
  .nav-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0px 15px;
    img{
      width: 50px;
      border-radius: 40%;
      background-color: #FFC0CB;
      color: red;
    }
    span{
      margin-top: 5px;
      text-align: center;
    }
  }
  // ::-webkit-scrollbar{
  //   display: none;
  // }
}
</style>