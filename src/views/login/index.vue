<template>
  <div class="outer">
    <div class="login-container">
      <div class="left">
        <H1>欢迎登陆，数据驾驶舱</H1>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
          <el-form-item prop="username">
            <i class="el-icon-user"></i>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="请输入账号"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="password">
            <i class="el-icon-lock"></i>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              @keyup.enter.native="login('loginForm')"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
          <el-checkbox v-model="checked">记住密码</el-checkbox>
          <el-button :loading="loading" type="primary" class="submit" @click.native.prevent="login('loginForm')">登 录</el-button>
        </el-form>
      </div>
      <div class="right"></div>
    </div>
    <!--流星-->
		<div class="liuxing liuxing1 liuxingFla"></div>
		<div class="liuxing liuxing2 liuxingFla2"></div>
		<div class="liuxing liuxing3 liuxingFla3"></div>
		<div class="liuxing liuxing4 liuxingFla4"></div>
    <img class="bg" src="https://img.hzanchu.com/acimg/25c5209e252fc1d6ef2a98a982482a7c.png" alt="">
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { login } from '@/service/user.js';
import md5 from 'js-md5';
import Cookies from 'js-cookie'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      console.log(value, 'value')
      if (!value) {
        callback(new Error('请输入用户名'))
      } else if (value.trim().length > 20) {
        callback(new Error('请输入20位以内的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6 || value.length > 18) {
        callback(new Error('请输入长度为6-18位的密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      checked: true
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    let accountInfo = Cookies.get('accountInfo')
    console.log(accountInfo, 'accountInfo')
    if(accountInfo) {
      this.loginForm = JSON.parse(accountInfo)
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    /**
     * todo 登录
     */
    login(formName) {
      console.log(this.checked, 'checked')
      if(this.checked) {
        Cookies.set('accountInfo', this.loginForm);
      } else {
        Cookies.set('accountInfo', '');
      }
      this.$refs[formName].validate(async (valid) => {
        if(valid) {
          const _data = await login({
            user_name: this.loginForm.username,
            password: md5(this.loginForm.password)
          })
          if(_data.code === 0) {
            localStorage.setItem('token', _data.data.token)
            localStorage.setItem('admin_info', JSON.stringify(_data.data.admin_info))
            this.$message.success('登录成功')
            this.$router.replace('/recordsCenter')
          } else {
            this.$message.error(_data.msg)
          }
        } else {
          console.log('error!')
          return
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .outer {
    width: 100vw;
    height: 100vh;
    position: relative;
    background: #f3f6f9;
  }
  .login-container {
    width: 2600px;
    height: 1500px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    .left {
      width: 1100px;
      height: 100%;
      padding: 0 100px;
      float: left;
      H1 {
        font-size: 80px;
        color: #409EFF;
        margin-top: 200px;
      }
      .login-form {
        width: 100%;
        overflow: hidden;
        .submit {
          width: 100%;
          height: 140px;
          margin-top: 160px;
        }
      }
    }
    .right {
      background: url(https://img.hzanchu.com/acimg/62df3319db33884ec195fa75ac69b394.png) no-repeat;
      background-size: 100%;
      width: 1500px;
      height: 100%;
      float: left;
    }
  }
  /*流星*/
  .liuxing {
    width: 165px;
    height: 165px;
    position: absolute;
    background: url(https://img.hzanchu.com/acimg/c24b0219730782dfdbacdba550072e66.png) no-repeat;
    background-size: contain;
    z-index: 100;
  }
  .liuxing1 {
    top: 200px;
    left: 200px;
  }

  .liuxing2 {
    top: 200px;
    left: 50%;
    margin-left: 200px;
  }

  .liuxing3 {
    top: 100px;
    right: 300px;
  }

  .liuxing4 {
    top: 150px;
    right: 300px;
  }

  .liuxingFla {
    animation: liuxing 5s ease-in infinite;
  }

  .liuxingFla2 {
    animation: liuxing2 4s ease-in infinite;
  }

  .liuxingFla3 {
    animation: liuxing3 3s linear infinite;
  }

  .liuxingFla4 {
    animation: liuxing4 2s linear infinite;
  }

  /* 流星动画 */
  @keyframes liuxing {
    0% {
      transform: translate(200px, -200px)
    }
    90% {
      transform: translate(-680px, 680px);
      opacity: 1;
    }
    100% {
      transform: translate(-800px, 800px);
      opacity: 0;
    }
  }

  @keyframes liuxing2 {
    0% {
      transform: translate(200px, -200px)
    }
    90% {
      transform: translate(-980px, 980px);
      opacity: 1;
    }
    100% {
      transform: translate(-1000px, 1000px);
      opacity: 0;
    }
  }

  @keyframes liuxing3 {
    0% {
      transform: translate(200px, -200px)
    }
    90% {
      transform: translate(-980px, 980px);
      opacity: 1;
    }
    100% {
      transform: translate(-1000px, 1000px);
      opacity: 0;
    }
  }

  @keyframes liuxing4 {
    0% {
      transform: translate(200px, -200px)
    }
    90% {
      transform: translate(-980px, 980px);
      opacity: 1;
    }
    100% {
      transform: translate(-1000px, 1000px);
      opacity: 0;
    }
  }

  /*菜单*/
  .moveUpDownFla1 {
    animation: moveUpDown 5s ease infinite;
  }

  .moveUpDownFla2 {
    animation: moveUpDown 4s linear infinite;
  }

  /* 菜单动画 */
  @keyframes moveUpDown {
    0% {
      transform: translate(0px, -20px)
    }
    50% {
      transform: translate(0px, 20px)
    }
    100% {
      transform: translate(0px, -20px);
    }
  }
  .bg {
    width: 100%;
    height: 600px;
    position: fixed;
    bottom: 0;
  }
</style>

<style lang="scss">
.login-container {
  .el-input {
    display: inline-block;
    height: 120px;
    width: 85%;
    input {
      background: transparent;
      border: none;
      -webkit-appearance: none;
      color: #333;
      height: 120px;
      caret-color: #333;
      font-size: 46px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #e8e8e8 inset !important;
        -webkit-text-fill-color: #333 !important;
      }
    }
  }

  .el-form-item {
    border-bottom: 1px solid #ddd;
    color: #454545;
    margin-top: 120px;
    transition: all 0.3s;
    .el-form-item__content {
      display: flex;
      align-items: center;
      i {
        font-size: 60px;
        font-weight: 600;
      }
    }
  }
  .el-form-item:hover {
    border-bottom: 1px solid #409EFF;
  }
}
</style>