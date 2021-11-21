<!--头部-->
<template>
  <navbar>
    <van-nav-bar @click-left="back">
      <template #left>
        <img
          class='back'
          src="~assets/icon/navbar/back.png"
        >
      </template>
      <template #title>
        <van-search
          ref="search"
          v-model="value"
          shape="round"
          :placeholder="defaultWord"
          @search='search'
        />
      </template>
    </van-nav-bar>
  </navbar>
</template>

<script>
import navbar from "components/content/navbar/navbar";
import {getDefaulWord} from 'network/search'
export default {
  name:'searchNav',
  data () {
    return {
      value:'',
      defaultWord:''
    };
  },
  created() {
    this.getDefaulWord()
    this.$nextTick(()=>{
      this.$refs.search.focus();
    })
  },
  components: {navbar},
  methods: {
    getDefaulWord(){
      getDefaulWord().then(res=>{
        this.defaultWord=res.data.showKeyword
      })
    },
    back(){
      if(this.$router.currentRoute._value.path !=='/search/hotSearch'){
        this.$router.replace({
          path:'/search'
        })
        this.value=''
      }else{
        this.$router.replace({
          path:'/find'
        })
      }
    },
    search(){
      if(this.value==''){
        this.value=this.defaultWord
      }
      this.$router.push({
        path:'/search/searchDetail',
        query:{
          word:this.value
        }
      })
    }
  },
}

</script>
<style lang='less' scoped>
.nav-bar{
  // min-height: 46px;
  // height: 6%;
  .van-nav-bar{
    // height: 100%;
    /deep/.van-nav-bar__content{
      // height: 100%;
      .back {
        height: 50%;
        vertical-align: middle;
      }
      .van-nav-bar__title {
        min-width: 90%;
        max-width: 90%;
        margin-right: 0px;
        .van-search {
          padding: 0px 12px;
        }
      }
    }
  }
}
</style>