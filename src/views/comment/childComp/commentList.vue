<!--评论详情-->
<template>
  <div id="comment-detail">
    <div class="list" v-if="commentList.length!==0">
      <div class="list-item" v-for="(item,index) in commentList">
        <div class="user">
          <img :src="item.user.avatarUrl">
          <div class="user-info">
            <div class="name">{{item.user.nickname}}</div>
            <div class="create-time">{{setData(item.time)}}</div>
          </div>
          <div class='dianzan'>
            <span>{{item.likedCount}}</span>
            <img src="~assets/icon/comment/dianzan.png">
          </div>
        </div>
        <div class="comment-text">
          {{item.content}}
          <div class="reply" v-if="item.showFloorComment.replyCount!=0">{{item.showFloorComment.replyCount}}条回复</div>
        </div>
      </div>
    </div>

    <div class="noneComment" v-else>
      <div>暂无评论，欢迎抢沙发</div>
    </div>
  </div>
</template>

<script>
import {formatDate} from 'utils/index'
export default {
  name:'commentDetail',
  props:{
    commentList:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{

  },
  data () {
    return {
    };
  },
  components: {},
  methods: {
    setData(value){
      let date = new Date(value);
      return formatDate(date, "yyyy年MM月dd日hh:mm");
    }
  },
}

</script>
<style lang='less' scoped>
#comment-detail{
  background-color: #fff;
  padding: 10px;
  min-height: 800px;
  .list{
    .list-item{
      padding: 10px 0;
      border-bottom: 1px solid rgba(245,245,245);
      .user{
        display: flex;
        img{
          width: 40px;
          border-radius: 50%;
        }
        .user-info{
          padding: 5px 0px 5px 10px;
          flex: 1;
        }
        .dianzan{
          display: flex;
          align-items: center;
          color: #999;
          padding: 5px 5px 5px 0;
          img{
            margin-left: 5px;
            width: 20px;
          }
        }
      }

      .comment-text{
        margin-left: 50px;
        font-size: 12px;
        font-weight: bold;
        .reply{
          margin-top: 8px;
          color: #6495ED;
        }
      }
    }
  }

  .noneComment{
    div{
      font-size: 12px;
      color: #999;
      width: 150px;
      text-align: center;
      margin:50px auto;
    }
  }
}
</style>