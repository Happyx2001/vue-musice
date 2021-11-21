<!---->
<template>
  <div id="category" v-if="species.length!==0">
    <div class="nav">
      <div class="content">
        <div class="nav-item" v-for="(item,index) in FirstTenArr" :key="index"
        @click='itemClick(index,item.id?item.id:item.name)'
        :class="{active:index===currentIndex}">
          <span>{{item.name}}</span>
        </div>
      </div>
      <div class="more" @click="moreClick">
        <img src="~assets/icon/video/caidan.png">
      </div>
    </div>

    <div class="hidden-nav" :class="{show:showMore}">
      <div class="nav-item" v-for="(item,index) in lastArr" :key="index"
      @click="itemClick(index+10,item.id?item.id:item.name)"
      :class="{active:index+10===currentIndex}">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Category',
  props:{
    species:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {
      currentIndex:0,

      showMore:false
    };
  },
  computed:{
    FirstTenArr(){
      let arr=new Array()
      for(let i=0;i<10;i++){
        arr.push(this.species[i])
      }
      return arr
    },

    lastArr(){
      let arr=new Array
      for(let i=10;i<this.species.length;i++){
        arr.push(this.species[i])
      }
      return arr
    }
  },
  methods: {
    itemClick(index,id){
      this.currentIndex=index
      if(this.showMore)
        this.showMore=false
      this.$emit('itemClick',id)
    },
    moreClick(){
      this.showMore=!this.showMore
      this.$emit('moreClick')
    }
  },
}

</script>
<style lang='less' scoped>
#category{
  .nav{
    position: relative;
    display: flex;
    padding: 10px 5px;
    background-color: #fff;
    z-index: 2;
    .content{
      display: flex;
      overflow-x: scroll;
      white-space: nowrap;
      .nav-item{
        padding: 0 10px;
        span{
          font-size: 16px;
          font-weight: bold;
        }
      }
      .active{
        background-color: rgba(255,182,193,0.3);
        border-radius: 20px;
        color: #DC143C;
      }
    }
    .more{
      float: right;
      padding:0 10px;
      img{
        width: 23px;
        vertical-align: middle;
      }
    }
  }


  .hidden-nav{
    position: fixed;
    display: flex;
    flex-wrap: wrap;
    max-height: 300px;
    overflow: scroll;
    transform: translate(0, -100%);
    transition: all .3s;
    z-index: 1;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: #fff;
    &.show{
      transform: translate(0,0)
    }
    .nav-item{
      padding: 0 10px;
      margin: 10px 0;
      span{
        font-size: 16px;
        font-weight: bold;
      }
    }

    .active{
      background-color: rgba(255,182,193,0.3);
      border-radius: 20px;
      color: #DC143C;
    }
  }
}
::-webkit-scrollbar{
  display: none;
}
</style>