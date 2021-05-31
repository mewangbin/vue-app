<template>
  <div class="login">
    <div class="login-form">
      <el-form :model="form" ref="loginForm" label-width="40px">
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="form.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <router-link to="/test">test</router-link>
  </div>
</template>

<script setup>
  import { reactive, ref } from '@vue/reactivity'
  import { ElMessage } from 'element-plus'
  import { userApi } from '../api'
  const loginForm = ref(null)
  const form = reactive({
    branchId: '120159',
    account: '120333',
    password: ''
  })
  const submitForm = () => {
    userApi
      .login(form)
      .then((result) => {
        const { code, msg, data } = result
        if (msg) {
          ElMessage.info(msg)
        }
        console.log('code:', code)
        console.log('msg:', msg)
        console.log('data:', data)
      })
      .catch((e) => {
        ElMessage.error(e.message)
      })
  }
  const resetForm = () => {
    loginForm.value.resetFields()
  }
</script>

<style scoped lang="scss">
  .login {
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 400px;
    height: 400px;
    .login-form {
      width: 100%;
      height: 200px;
      border-radius: 10px;
      box-shadow: 1px 1px 10px #333;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
