<!--表单-->
<template>
  <van-form>
    <van-field
      v-model="state.phone"
      name="phone"
      label="手机号"
      placeholder="请输入手机号"
      :rules="[{ required: true, message: '请填写手机号' }]"
    />
    <van-field
      v-model="state.password"
      type="password"
      name="password"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script>
import { reactive } from 'vue';

// import {login} from 'network/login'
export default {
  name:'loginForm',
  setup() {
    const state = reactive({
      phone: '',
      password: '',
    });
    const onSubmit = (values) => {
      console.log('submit', values);
    };
    return {
      state,
      onSubmit,
    };
  }
}

</script>
<style lang='scss' scoped>
</style>