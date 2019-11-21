<template>
    <div id="login">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm">         
            <h2>Ray商城登录</h2>
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" name="username" placeholder="请输入用户名/手机号" auto-complete="on"></el-input>
            </el-form-item>

            <el-form-item prop="username">
                <el-input v-model="loginForm.password" name="password" type="password" placeholder="请输入密码" auto-complete="on"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
import { loginReq } from '@/apis/auth';
export default {
  name: "login",
  data() {
    return {
        loginForm: {
            username: '',
            password: '',
        },
        loginRules: {
            username: [
                {
                    required: true,

                    message: "请输入用户名",

                    trigger: "blur"
                }
            ],
            password: [
            {
                required: true,
                message: '请输入密码',
                trigger: 'blur'
            }
            ]
        }

    }
  },

  methods: {
      handleLogin (){
           this.$refs.loginForm.validate((valid) => {
               if(valid){
                  loginReq(this.loginForm.username,this.loginForm.password).then((res) => {
                      console.log(res);
                  })
               }else{
                   console.log('用户名或密码错误')
               }
           })
      }
  }
};
</script>
<style scoped>
.el-input {
        width:300px;
}    
</style>