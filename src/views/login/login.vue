<!--登录页面-->
<template>
  <div id="login">
    <div class="title">
      <img src="~assets/icon/login/close.png" @click="back">
      <h2>手机号登录</h2>
    </div>
    <div class="descript">
      <h2>登录后体验更多精彩</h2>
    </div>
    <login-form @submit='tryToLogin'></login-form>
  </div>
</template>

<script>
import loginForm from './childComp/form'

import {login} from 'network/login'

import {mapActions} from 'vuex';
export default {
  data () {
    return {
    };
  },
  components: {loginForm},
  methods: {
   ...mapActions(['setLoginStatus','setUserInfo']),
    async tryToLogin(values){
      try {
        const res=await login(values.phone,values.password)
        console.log(res);
        if(res.code==502){
         this.$toast.fail({
            message: '密码错误',
            forbidClick: true,
          })
        }
        else if(res.code==400){
         this.$toast.fail({
            message: '该手机号未注册',
            forbidClick: true,
          })
        }
        else{
          const cookie=encodeURIComponent(res.cookie)
          localStorage.setItem('uid', res.account.id);
          localStorage.setItem('cookie',cookie)
          // await this.setLoginStatus()
          this.$router.replace('/profile');
          await this.setUserInfo()
          this.$toast.success({
            message:'登录成功',
            forbidClick: true,
            duration:2000
          })
        }
      } catch (error) {
        console.log(error);
        this.$toast.fail({
          message:error.message,
          forbidClick: true
        })
      }
    },
    back(){
      this.$router.push({
        path:'/find'
      })
    }
  },
  beforeCreate() {
    this.$store.commit('setTabBarShow',false)
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('setTabBarShow',true)
    next()
  }
}

</script>
<style lang='less' scoped>
#login{
  .descript{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .title{
    display: flex;
    align-items: center;
    padding: 0px 10px;
    img{
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    h2{
      margin-left: 20px;
    }
  }
}
</style>