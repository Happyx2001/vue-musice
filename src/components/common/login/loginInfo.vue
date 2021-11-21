<!--登录-->
<template>
  <div id='login' @click="Object.keys(userInfo).length==0 ? login() : ToMyWeb()" ref="loginComp">
    <div class="user-pic">
      <van-image :src="userInfo.profile.avatarUrl" v-if='Object.keys(userInfo).length !== 0' class="user-pic-img" fit="cover" round />
      <van-image :src="defaultPic" v-else class="user-pic-img" fit="cover" round />
    </div>
    <div class="user-info">
      <span v-if='Object.keys(userInfo).length !== 0'>{{userInfo.profile.nickname}}</span>
      <span v-else>立即登陆</span>
      <!-- <div class="phone-num">
        <img alt="" class="icon-phone" src="~assets/img/profile/phone.svg" />
        <span>暂未绑定手机号</span>
      </div> -->
    </div>
    <div class="profile-arrow-right" ref="icon">
      <img src="~assets/icon/profile/arrow-right.png" />
    </div>
  </div>
</template>

<script>
export default {
  name:'loginInfo',
  props:{
    userInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data () {
    return {
      defaultPic: require("assets/icon/profile/avatar.svg")
    };
  },
  components: {},
  methods: {
    login(){
      this.$router.push({
        path:'/login'
      })
    },
    ToMyWeb(){
      console.log("进入个人界面");
    }
  },
}

</script>
<style lang='less' scoped>
#login {
  position: relative;
  display: flex;
  align-items: center;
  /* width: 100%; */
  height: 80px;
  padding: 0 20px;
  background-color: rgba(0, 0, 0, 0);
  .user-pic {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: white;
  }

  .user-info {
    font-size: 18px;
    font-weight: bold;
    margin-left: 20px;
    color: #333;
    p:last-child {
      margin-left: 3px;
    }
    .phone-num {
      font-size: 15px;
      display: flex;
      align-items: center;
      margin-top: 8px;
      .icon-phone {
        display: inline-block;
        width: 16px;
        height: 16px;
      }
    }
  }

  .profile-arrow-right {
    position: absolute;
    right: 10px;
    width: 20px;
    height: 20px;
    img{
      display: inline-block;
      width: 20px;
      height: 20px;
    }
  }
}
</style>