<!--热搜列表-->
<template>
  <div id="hot-search">
    <div class="title">热搜榜</div>
    <div class="box">
      <div class="item" v-for="(item,index) in HotSearchData" :key="index" @click="itemClick(item.searchWord)">
        <span>{{index+1}}</span>
        <span class="text">{{item.searchWord}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {getHotSearchDetail} from 'network/search'
export default {
  name:'hotSearch',
  data () {
    return {
      HotSearchData:[]
    };
  },
  created() {
    this.getHotSearchDetail()
  },
  components: {},
  methods: {
    getHotSearchDetail(){
      getHotSearchDetail().then(res=>{
        this.HotSearchData=res.data
        // console.log(res.data);
      })
    },
    itemClick(word){
      this.$emit('hotItemClick',word)
    }
  },
}

</script>
<style lang='less' scoped>
#hot-search{
  padding: 0 10px;
  .title{
    padding: 8px 0;
    font-size: 14px;
    font-weight: bold;
  }
  .box{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    .item{
      width: 40%;
      padding: 10px 10px;
      font-size: 12px;
      .text{
        margin-left: 5px;
      }
    }
  }
}
</style>