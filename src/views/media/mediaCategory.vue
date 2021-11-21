<!--分类页面-->
<template>
  <div id="category">
    <div class="rec-item" v-for="(item,index) in recCategory" :key="index">
      <div class="header">
        <h2>{{item.categoryName}}</h2>
      </div>
      <div class="content">
        <div class="list-item" v-for="(radio,index) in item.radios" :key="index" @click="toPageList(radio.id)">
          <div class="item-img">
            <img :src="radio.picUrl">
            <span class="count">{{filterCount(radio.playCount)}}</span>
          </div>
          <div class="descript">
            <span>{{radio.rcmdText}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getRecCategory} from 'network/media'
export default {
  name:'mediaCategory',
  data () {
    return {
      recCategory:[]
    };
  },
  created() {
    this.getRecCategory()
  },
  components: {},
  methods: {
    getRecCategory(){
      getRecCategory().then(res=>{
        this.recCategory=res.data
        console.log(res.data);
      })
    },
    filterCount(item){
      if(item<100000)
        return item
      else if(item>10000 && item<100000000)
        return (item/10000).toFixed(1) +'万'
      else
        return(item/100000000).toFixed(1)+'亿'
    },
    toPageList(ListID){
      this.$router.push({
        path:'/songList',
        query:{
          SongListId:ListID,
          type:'media'
        }
      })
    }
  },
}
</script>
<style lang='less' scoped>
#category{
  .rec-item{
    padding-bottom: 10px;
    border-bottom: 8px solid rgba(128, 128, 128, 0.1);
    background-color: #ffffff;
    overflow: hidden;
    .header{
      padding: 0px 15px;
    }

    .content{
      display: flex;
      justify-content: space-between;
      padding: 0px 10px;
      .list-item{
        position: relative;
        // padding: 0px 5px;
        .item-img{
          img{
            width: 110px;
            border-radius: 10%;
          }
          .count{
            position: absolute;
            left: 55px;
            right: 0;
            top: 8px;
            bottom: 0;
            height: 16px;
            width: 50px;
            background-color: rgba(0, 0, 0, 0.3);
            text-align: center;
            color: white;
            border-radius: 20px;
          }
        }

        .descript{
          max-width: 110px;
        }
      }
    }
  }
}
</style>