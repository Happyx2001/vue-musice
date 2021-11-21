<!--歌单详情界面-->
<template>
  <div id="song-detail" @click="!isShowSetPanel && hideListDetail()">
    <img class='bg' :src="songInfo.songImg">
    <div class="top-img">
      <img :src="songInfo.songImg">
      <div class="name">{{songInfo.songTitle}}</div>
    </div>
    <div class="info">
      <div class="tag">
        <span>标签：</span>
        <span class='tag-list' v-for="(item,index) in songInfo.songListTag" :key='index'>{{item}}</span>
      </div>
      <div class="des">{{songInfo.songDescription}}</div>
    </div>
    <div class="btn">
      <button @click.stop="showSetPanel" v-show="songInfo.isSet">编辑封面</button>
      <button @click.stop="loadBgImg">保存封面</button>
    </div>

    <div class="set-panel" :class="{show:isShowSetPanel}">
      <div class="nav">
        <img src="~assets/icon/navbar/back.png" @click.stop="hideSetPanel">
        <span>编辑歌单信息</span>
        <button @click="submit">提交</button>
      </div>
      <div class="panel">
        <van-field v-model="ListTitle" label="名称"/>
        <div class="settag" @click="showTagPanel">
          <div class="title"><span>标签</span></div>
          <div class=value>
            <div class="tag-body">
              <span class="tag-list" v-for="(item,index) in ListTag">{{item}}</span>
            </div>
          </div>
        </div>
        <van-field v-model="ListDes" rows='100' autosize label="描述" type="textarea"/>
      </div>
      <div class="tag-panel" :class="{show:isShowTabPanel}">
        <div class="tag-nav">
          <img src="~assets/icon/navbar/back.png" @click.stop="hideTagPanel">
          <span>选择标签</span>
        </div>
        <div class="tag-content">
          <span v-for="(item,index) in alltag" :key="index" :class="{active:indexIsInCurTagArr(index,curTagIndexArr)}" @click="addtag(item,index)">{{item}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCategory} from 'network/allList'

// import {NumIsInArr} from 'utils/index'
export default {
  name:'songDetail',
  props:{
    songInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data () {
    return {
      isShowSetPanel:false,
      isShowTabPanel:false,

      ListTitle:'',
      ListTag:[],
      ListDes:'',

      alltag:[],
      curTagIndexArr:[]
    };
  },
  created() {
    this.getCategory()
  },
  watch:{
    getSongListTltle(newValue){
      this.ListTitle=newValue
    },
    getSongListTag(newValue){
      this.ListTag=newValue
    },
    getSongListDes(newValue){
      this.ListDes=newValue
    },
    isShowSetPanel(isShow){
      if(isShow){
        this.ListTag=this.getSongListTag
        if(this.curTagIndexArr.length!==0){
          this.curTagIndexArr=[]
        }
        this.ListTag.forEach(element => {
          this.curTagIndexArr.push(this.alltag.indexOf(element))
        });
      }
    }
  },
  computed:{
    getSongListTltle(){
      return this.songInfo.songTitle
    },
    getSongListTag(){
      return this.songInfo.songListTag
    },
    getSongListDes(){
      return this.songInfo.songDescription
    }
  },
  components: {},
  methods: {
    // 判断索引是否在当前标签索引列表里，若是返回true，否则返回false
    indexIsInCurTagArr(index,arr){
      let flag=false
      for(let i=0;i<arr.length;i++){
        if(index==arr[i]){
          flag=true
          break;
        }
      }
      return flag
    },
    // 获取所有标签列表
    getCategory(){
      getCategory().then(res=>{
        res.sub.forEach(element =>{
          this.alltag.push(element.name)
        })
      })
    },
    // 隐藏歌单详细信息页面
    hideListDetail(){
      this.$emit('hideListDetail')
    },
    // 展示设置界面
    showSetPanel(){
      this.isShowSetPanel=true
    },
    // 隐藏设置界面
    hideSetPanel(){
      this.isShowSetPanel=false
    },
    // 展示标签界面
    showTagPanel(){
      this.isShowTabPanel=true
    },
    // 隐藏标签界面
    hideTagPanel(){
      this.isShowTabPanel=false
    },
    // 修改标签
    addtag(tag,index){
      let _copylistTag1=[]
      let _curTagIndexArr=[]
      Object.assign(_copylistTag1, this.ListTag)
      Object.assign(_curTagIndexArr, this.curTagIndexArr)
      if(this.indexIsInCurTagArr(index,this.curTagIndexArr)){
        _curTagIndexArr.splice(_curTagIndexArr.findIndex(e => e===index),1)
        _copylistTag1.splice(_copylistTag1.findIndex(e => e===tag ),1)
      }else{
        if(this.curTagIndexArr.length>=3){
          this.$toast.fail({
            message: '只能添加三个标签',
            duration:2000
          })
          return
        }
        _curTagIndexArr.push(index)
        _copylistTag1.push(tag)
      }
      this.ListTag=_copylistTag1
      this.curTagIndexArr=_curTagIndexArr
    },
    // 下载封面
    loadBgImg(){
      
    },
    submit(){
      const obj={
        name:this.ListTitle,
        desc:this.ListDes,
        tags:this.ListTag.join(';')
      }
      this.$emit('updateListInfo',obj)
    }
  },
}

</script>
<style lang='less' scoped>
#song-detail{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(192,192,192, 1);
  opacity: 0;
  transition: all .3s;
  z-index: -1;
  &.show{
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 999;
    opacity: 1;
  }
  .bg{
    filter: blur(80px);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    z-index: -1;
  }
  .top-img{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 40%;
    width: 100%;
    border: 1px solid rgba(255, 255, 255, .1);
    img{
      width: 150px;
      border-radius: 20px;
    }
    .name{
      margin-top: 20px;
      font-size: 16px;
      color: #fff;
      font-weight: bold;
    }
  }
  .info{
    width: 100%;
    height: 50%;
    box-sizing: border-box;
    padding: 20px;
    overflow: scroll;
    white-space:pre-wrap;
    .tag{
      span{
        color: #fff;
        font-size: 14px;
        vertical-align: middle;
        &.tag-list{
          font-size: 10px;
          padding: 5px 10px;
          margin: 0px 5px;
          background-color: rgba(255, 255, 255, .2);
          border-radius: 20px;
        }
      }
    }
    .des{
      font-size: 12px;
      margin-top: 20px;
      color: #fff;
    }
  }
  .btn{
    margin-top: 10px;
    button{
      padding: 5px 15px;
      margin: 0 10px;
      color: #fff;
      background-color: rgba(255, 255, 255, 0);
      border: 1px solid rgba(255, 255, 255, .5);
      border-radius: 20px;
    }
  }
  .set-panel{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    display: none;
    &.show{
      display: block;
    }
    .nav{
      display: flex;
      align-items: center;
      img{
        padding: 10px;
        box-sizing: border-box;
        width: 50px;
      }
      span{
        flex: 1;
        font-size: 16px;
        font-weight: bold;
        margin-left: 20px;
      }
      button{
        padding: 5px 15px;
        margin-right: 20px;
        background-color: rgba(255, 255, 255, 0);
        border: 1px solid rgba(0, 0, 0, .3);
        border-radius: 20px;
      }
    }
    .panel{
      .settag{
        position: relative;
        display: flex;
        box-sizing: border-box;
        width: 100%;
        padding: 10px 16px;
        overflow: hidden;
        color: #323233;
        font-size: 14px;
        line-height: 24px;
        background-color: #fff;
        &.settag::after{
          position: absolute;
          box-sizing: border-box;
          content: ' ';
          pointer-events: none;
          right: 16px;
          bottom: 0;
          left: 16px;
          border-bottom: 1px solid #ebedf0;
          transform: scaleY(.5);
        }
        .title{
          flex: none;
          box-sizing: border-box;
          width: 6.2em;
          margin-right: 12px;
          color: #646566;
          text-align: left;
          word-wrap: break-word;
          font-size: 12px;
        }
        .value{
          position: relative;
          overflow: hidden;
          color: #969799;
          text-align: right;
          vertical-align: middle;
          word-wrap: break-word;
          .tag-body{
            display: flex;
            align-items: center;
            .tag-list{
              font-size: 12px;
              color: #999;
              margin: 0 5px;
              padding: 0 10px;
              background-color: rgba(255, 255, 255, 0);
              border: 1px solid rgba(0, 0, 0, .2);
              border-radius: 20px;
            }
          }
        }
      }
    }
    .tag-panel{
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #fff;
      transition: all .3s;
      transform: translateY(100%);
      &.show{
        transform: translateY(0);
      }
      .tag-nav{
        display: flex;
        align-items: center;
        img{
          padding: 10px;
          box-sizing: border-box;
          width: 50px;
        }
        span{
          flex: 1;
          font-size: 16px;
          font-weight: bold;
          margin-left: 20px;
        }
      }
      .tag-content{
        overflow: hidden;
        span{
          display: inline-block;
          padding: 5px 10px;
          margin: 10px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
          font-size: 14px;
          border-radius: 10px;
          &.active{
            border: 1px solid rgba(250,128,114, 0.8);
          }
        }
      }
    }
  }
}

</style>