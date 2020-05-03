<template>
    <div id="login">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="6">
                <el-card class="box-card">
                    <el-form :model="loginForm" :rules="loginRules" ref="loginForm">         
                        <h2>登录</h2>
                        <el-form-item prop="username">
                            <el-input v-model="loginForm.username" name="username" placeholder="请输入用户名" auto-complete="on"></el-input>
                        </el-form-item>

                        <el-form-item prop="password">
                            <el-input v-model="loginForm.password" name="password" type="password" placeholder="请输入密码" auto-complete="on"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-tag type="danger" effect="plain" v-if="loginFail">
                                用户名或者密码不正确！
                            </el-tag>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="handleLogin" plain>登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>


<script>
import { loginReq } from '@/apis/auth';
export default {
  name: "login",
  data() {
    return {
        loginFail: false,
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
                    console.log(res.data.token);
                    window.localStorage.setItem('token', res.data.token);
                    window.localStorage.setItem('userName', this.loginForm.username);
                    this.$router.push("/admin/home");
                }).catch(error => {
                    this.loginFail = true;
                    console.log(error.response);
                });
            }else{
                console.log('用户名或密码错误');
            }
        })
    }
  }
};
</script>
<style>
#login {
  text-align: center;
}
</style>