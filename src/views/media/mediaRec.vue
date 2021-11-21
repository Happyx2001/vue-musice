<!--推荐页面-->
<template>
  <div id='media-rec'>
    <div class="search">
      <van-search
        shape="round"
        placeholder="请输入搜索关键词"
        @focus='toPageSearch'
      />
    </div>

    <div class="personalize-rec">
      <div class="title">
        <h2>个性推荐</h2>
      </div>
      <div class="personalize-content">
        <div class="content-item" v-for="(item,index) in PersonalizeRecMedia" :key="index" @click="toPageList(item.id)">
          <div class="item-img">
            <img :src="item.picUrl">
            <span class="count">{{filterCount(item.subCount)}}</span>
          </div>
          <div class="description">
            <span><span class="catagory">{{item.category}}</span>{{item.rcmdText}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="today-prefer">
      <div class="title">
        <h2>今日优选</h2>
      </div>
      <div class="today-content">
        <div class="content-item" v-for="(item,index) in TodayPreferMedia" :key="index" @click="toPageList(item.id)">
          <div class="item-img">
            <img :src="item.picUrl">
            <span class="count">{{filterCount(item.playCount)}}</span>
          </div>
          <div class="description">
            <span>{{item.rcmdText}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="hot-media">
      <div class="title">
        <h2>热门电台</h2>
      </div>
      <div class="hot-content">
        <div class="content-item" v-for="(item,index) in HotMedia" :key="index" @click="toPageList(item.id)">
          <div class="item-img">
            <img :src="item.picUrl">
            <span class="count">{{filterCount(item.subCount)}}</span>
          </div>
          <div class="description">
            <span><span class="catagory">{{item.category}}</span>{{item.rcmdtext}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="rec-programs">
      <div class="title">
        <h2>不容错过的好声音</h2>
      </div>
      <div class="programs-content">
        <div class="content-item" v-for="(item,index) in RecPrograms" :key="index" @click="toShowPlayer(item)">
          <div class="song-img">
            <img :src="item.coverUrl">
          </div>
          <div class="song-info">
            <span class="come-from">{{item.radio.name}}</span>
            <span class="name">{{item.name}}</span>
            <div class="num-info">
              <span>听众：{{item.listenerCount}}</span>
            </div>
            <span class="rec-text">{{item.reason}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getPersonalizeRec,getTodayPrefer,getHotMedia,getRecPrograms,getProgram} from 'network/media'

import {mapActions,mapMutations} from 'vuex';
export default {
  name:'mediaRec',
  data () {
    return {
      PersonalizeRecMedia:[],
      TodayPreferMedia:[],
      HotMedia:[],
      RecPrograms:[],

      tid:null
    };
  },
  created() {
    const offset=Math.floor(Math.random()*30+1)
    this.getPersonalizeRec()
    this.getTodayPrefer()
    this.getHotMedia(6,offset)
    this.getRecPrograms()
  },
  methods: {
    ...mapActions(['setCurPlayMusic','showPlayer']),
    ...mapMutations(['updateCurPlayMusicList']),
    async getPersonalizeRec(){
      try {
        const res=await getPersonalizeRec()
        this.PersonalizeRecMedia=res.data
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async getTodayPrefer(){
      try {
        const res=await getTodayPrefer()
        this.TodayPreferMedia=res.data
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async getHotMedia(limit,offset){
      try {
        const res=await getHotMedia(limit,offset)
        this.HotMedia=res.djRadios
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async getRecPrograms(){
      try {
        const res=await getRecPrograms()
        this.RecPrograms=res.programs
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async getProgram(ListId){
      let list=[]
      try {
        const res=await getProgram(ListId)
        list=res.programs
      } catch (error) {
        console.log(error);
      }
      return list
    },
    filterCount(item){
      if(item<100000)
        return item
      else if(item>10000 && item<100000000)
        return (item/10000).toFixed(1) +'万'
      else
        return(item/100000000).toFixed(1)+'亿'
    },
    toPageList(ListId){
       this.$router.push({
        path:'/songList',
        query:{
          SongListId:ListId,
          type:'media'
        }
      })
    },
    toShowPlayer(obj){
      window.clearTimeout(this.tId)
      this.tId=window.setTimeout(()=>{
        this.getProgram(obj.radio.id).then(programList=>{
          this.updateCurPlayMusicList(programList)
          this.setCurPlayMusic(obj)
          this.showPlayer(true)
        })
      },0)
    },
    toPageSearch(){
      this.$router.push({
        path:'/search'
      })
    }
  },
}

</script>
<style lang='less' scoped>
#media-rec{
  .title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
  }
  .personalize-rec,.today-prefer,.hot-media,.rec-programs{
    background-color: #fff;
    margin-bottom: 8px;
  }

  .personalize-rec{
    .personalize-content{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0px 10px 20px;
      .content-item{
        position: relative;
        .item-img{
          img{
            width: 100px;
            border-radius: 10px;
          }
          .count{
            position: absolute;
            left: 50px;
            right: 0;
            top: 8px;
            bottom: 0;
            height: 15px;
            width: 45px;
            background-color: rgba(0,0,0,.3);
            text-align: center;
            color: #fff;
            border-radius: 10px;
          }
        }
        .description{
          max-width: 100px;
          padding: 2px;
          .catagory{
            color: #999;
            border: 1px solid rgba(0,0,0,.1);
            border-radius: 5px;
            padding: 1px;
            margin-right: 2px;
          }
        }
      }
    }
  }

  .today-prefer{
    .today-content{
        display: flex;
        justify-content: space-between;
        padding: 0px 10px 20px;
        .content-item{
        position: relative;
        .item-img{
          img{
            width: 100px;
            border-radius: 10px;
          }
          .count{
            position: absolute;
            left: 40px;
            right: 0;
            top: 8px;
            bottom: 0;
            height: 15px;
            width: 50px;
            background-color: rgba(0,0,0,.3);
            text-align: center;
            color: #fff;
            border-radius: 10px;
          }
        }
        .description{
          max-width: 100px;
          padding: 2px;
        }
      }
    }
  }

  .hot-media{
    .hot-content{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0px 10px 20px;
      .content-item{
        position: relative;
        .item-img{
          img{
            width: 100px;
            border-radius: 10px;
          }
          .count{
            position: absolute;
            left: 50px;
            right: 0;
            top: 8px;
            bottom: 0;
            height: 15px;
            width: 45px;
            background-color: rgba(0,0,0,.3);
            text-align: center;
            color: #fff;
            border-radius: 10px;
          }
        }
        .description{
          max-width: 100px;
          padding: 2px;
          .catagory{
            color: #999;
            border: 1px solid rgba(0,0,0,.1);
            border-radius: 5px;
            padding: 1px;
            margin-right: 2px;
          }
        }
      }
    }
  }

  .rec-programs{
    .programs-content{
      display: flex;
      flex-direction: column;
      padding: 0 10px;
      .content-item{
        display: flex;
        margin: 10px 0;
        img{
          width: 120px;
          border-radius: 10px;
        }
        .song-info{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          max-width: 60%;
          padding: 10px 0;
          margin-left: 10px;
          .come-from,.num-info{
            color: #999;
          }
          .name{
            font-size: 16px;
            color: #333;
            font-weight: 700;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }

}
</style>