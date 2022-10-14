<template>
  <div>
    <div class="header" v-if="$route.path === '/cockpit'">
      <div @click="backhome">
        <img src="../assets/image/index/index09.png" alt="">
        <span>返回主页</span>
      </div>
      <div>
        <span @click="toOnePic()">数字乡村一张图</span>
      </div>
      <div>
        <span @click="toDataCenter()">数字运营分析中心</span>
      </div>
      <!-- <div>
        <span @click="changeView()">切换视图模式>></span>
      </div> -->
      <div @click="logout()">
        <span>退出</span>
      </div>
    </div>

    <div class="header" v-else>
      <div @click="$router.push('/newcockpit')" v-show="isLogin">
        <img src="../assets/image/index/index06.png" alt="">
        <span>管理中心</span>
      </div>
      <div @click="backhome">
        <img src="../assets/image/index/index09.png" alt="">
        <span>返回主页</span>
      </div>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div v-show="isLogin">
          <img src="../assets/image/index/index02.png" alt="">
          <span>{{admin_info.user_name}}</span>
          <p></p>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="toUserList()" v-if="admin_info.type === 1">
            <span style="display:block;">用户中心</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="changeInfo()">
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout()">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div @click.stop="showLoginPopup()" v-show="!isLogin && $route.path === '/recordsCenter'">
        <span>登录</span>
      </div>
    </div>

    <!-- 修改密码 -->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="35%"
    >
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 登录 -->
    <transition name="fade">
      <div class="login-module" v-show="showDialog" @click.stop>
        <div class="login-dialog">
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
            <div @click="showDialog = false" class="hide">暂不登录</div>
          </el-form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { updateAdminInfo } from '@/service/user'
import md5 from 'js-md5';
import { login } from '@/service/user.js';
import Cookies from 'js-cookie'
export default {
  name: 'headerHandle',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 6 || value.length > 18) {
        callback(new Error('请输入6-18位的密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const validateUsername = (rule, value, callback) => {
      console.log(value, 'value')
      var reg = /^[\u4e00-\u9fa5a-zA-Z0-9_-]{0,}$/;
      if (!value) {
        callback(new Error('请输入用户名'))
      } else if (value.trim().length > 20) {
        callback(new Error('请输入20位以内的用户名'))
      } else if(!reg.exec(value)) {
        callback(new Error('您输入的账号中含有非法字符，请重新输入'))
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
      isLogin: false,
      admin_info: '',
      showDialog: false,
      dialogVisible: false,
      ruleForm: {
        pass: '',
        checkPass: '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      // acNumber: '',
      // password: '',
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
      checked: true
    }
  },
  mounted() {
    // 记住密码
    let accountInfo = Cookies.get('accountInfo')
    console.log(accountInfo, 'accountInfo')
    if(accountInfo) {
      this.loginForm = JSON.parse(accountInfo)
    }
    // 验证登录状态
    if(localStorage.getItem('token')) {
      this.isLogin = true
      if(localStorage.getItem('admin_info')) {
        this.admin_info = JSON.parse(localStorage.getItem('admin_info'))
      }
    } else {
      this.isLogin = false
    }
    console.log(this.admin_info, 'admin_info')
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
            this.admin_info = _data.data.admin_info
            this.$message.success('登录成功')
            // this.$router.replace('/recordsCenter')
            this.showDialog = false
            this.isLogin = true
          } else {
            this.$message.error(_data.msg)
          }
        } else {
          console.log('error!')
          return
        }
      })
    },
    changeView() {
      this.$emit('changeView')
    },
    backhome() {
      this.$router.replace('/dataCenter')
    },
    toOnePic() {
      window.open('http://zrzy.phxmgl.cn/pinghu-web/index.html')
    },
    toDataCenter() {
      window.open('http://rdos.anchu.cn/dataApi/#/api/manage/newApi')
    },
    showLoginPopup() {
      // this.$router.push('/login')
      this.showDialog = true
    },
    changeInfo() {
      this.dialogVisible = true
    },
    logout() {
      localStorage.clear()
      this.isLogin = false
      this.admin_info = ''
      if(this.$route.path !== '/dataCenter') {
        this.$router.replace('/dataCenter')
      } else {
        location.reload()
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const _data = await updateAdminInfo({
            password: md5(this.ruleForm.pass)
          })
          if(_data.code === 0) {
            this.dialogVisible = false
            this.$message('修改密码成功，请重新登录')
            // this.$router.replace('/login')
            this.showDialog = true
          } else {
            this.$message.error(_data.msg)
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toUserList() {
      this.$router.push('/userManage')
    }
  }
}
</script>

<style lang="scss" scoped>
  // .header {
  //   position: fixed;
  //   top: 10%;
  //   right: 3%;
  //   display: flex;
  //   align-items: center;
  //   div {
  //     display: flex;
  //     align-items: center;
  //     margin-left: 40px;
  //     cursor: pointer;
  //     img {
  //       height: 50px;
  //       margin-right: 10px;
  //     }
  //     span {
  //       font-size: 44px;
  //       color: #00E2FD;
  //     }
  //   }
  //   div:hover span {
  //     text-decoration: underline;
  //   }
  // }
  .header {
    position: absolute;
    overflow: hidden;
    top: 100px;
    right: 3%;
    display: flex;
    align-items: center;
    div {
      display: flex;
      align-items: center;
      margin-right: 50px;
      cursor: pointer;
      img {
        height: 50px;
        margin-right: 10px;
      }
      span {
        font-size: 44px;
        font-family: PingFang SC Regular, PingFang SC Regular-Regular;
        font-weight: 400;
        color: #75E3FF;
      }
      p {
        width: 15px;
        height: 15px;
        border-top: 2px solid #75E3FF;
        border-right: 2px solid #75E3FF;
        transform: rotate(135deg);
        margin: 0 10px;
        transition: all 0.3s;
      }
    }
    div:hover {
      span {
        text-decoration: underline;
      }
      // p {
      //   transform: rotate(135deg)
      // }
    }
  }
  .login-module {
    width: 100%;
    height: 100vh;
    position: relative;
    background: rgba(0,0,0,0.5);
    z-index: 99;
  }
  .login-dialog {
    width: 30%;
    height: 1180px;
    background: url('../assets/image/index/index03.png') no-repeat;
    background-size: 100%;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
    .login-form {
      width: 60%;
      margin: 140px auto 0;
      overflow: hidden;
      .submit {
        width: 100%;
        margin: 100px auto 0;
      }
      .hide {
        font-size: 36px;
        color: #fff;
        text-align: center;
        margin-top: 50px;
        cursor: pointer;
      }
    }
  }
</style>
<style lang="scss">
  .login-dialog {
    .el-input {
      display: inline-block;
      height: 120px;
      width: 85%;
      input {
        background: transparent;
        border: none;
        -webkit-appearance: none;
        color: #fff;
        height: 120px;
        caret-color: #fff;
        font-size: 46px;
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px #fff inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
      input:-webkit-autofill {
        -webkit-text-fill-color: #333 !important;
        box-shadow: 0 0 0 100px #fff inset !important;
      }
    }

    .el-form-item {
      border-bottom: 1px solid #fff;
      color: #fff;
      margin-top: 100px;
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
    .el-checkbox__label {
      color: #fff;
    }
    .el-form-item:hover {
      border-bottom: 1px solid #409EFF;
    }
    .el-table::before {
      background: none;
    }
    input:-internal-autofill-selected {
      background-color: transparent !important;
    }
  }
</style>
