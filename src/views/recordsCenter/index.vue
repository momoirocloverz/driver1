<template>
  <div class="outer" @click="showDialog = false">
      <img class="title" src="https://img.hzanchu.com/acimg/2e935878ff6caaa1bb24a9351357b1a5.png" alt="">
      <!-- 头部 -->
      <!-- <div class="handle">
        <div @click="$router.push('/cockpit')" v-show="isLogin">
          <img src="../../assets/image/index/index06.png" alt="">
          <span>管理中心</span>
        </div>
        <div @click="backhome">
          <img src="../../assets/image/index/index09.png" alt="">
          <span>返回主页</span>
        </div>
        <div v-show="isLogin">
          <img src="../../assets/image/index/index02.png" alt="">
          <span>{{admin_info.user_name}}</span>
          <p></p>
        </div>
        <div @click.stop="showLoginDialog()" v-show="!isLogin">
          <span>登录</span>
        </div>
        <div v-show="isLogin" @click="logout()">
          <span>退出</span>
        </div>
      </div> -->
      <header-handle></header-handle>
      <!-- 特色产业区 -->
      <div class="left">
        <div class="content">
          <img class="bg" src="https://img.hzanchu.com/acimg/ccab6d4eb766bace8116641b1f034de1.png" alt="">
          <div class="icon icon1" @click.stop="toDetail('1')">
            <p>芦笋</p>
            <img src="https://img.hzanchu.com/acimg/46dd3236959cc5a86659256e4f19cbd8.png" alt="">
          </div>
          <div class="icon icon2" @click.stop="toDetail('2')">
            <p>食用菌</p>
            <img src="https://img.hzanchu.com/acimg/972444858c98cb9311cfdf244c90b7f3.png" alt="">
          </div>
          <div class="icon icon3" @click.stop="toDetail('')">
            <p>西瓜</p>
            <img src="https://img.hzanchu.com/acimg/a5ddc1c401c8b2d169968a66e5a1a1cb.png" alt="">
          </div>
          <div class="icon icon4" @click.stop="toDetail('')">
            <p>花卉</p>
            <img src="https://img.hzanchu.com/acimg/b8b9305e3bc8f3f813f0bd574ed62889.png" alt="">
          </div>
        </div>
      </div>
      <!-- 导航区 -->
      <img class="disk" src="https://img.hzanchu.com/acimg/336467d0071953c222155425153fa23f.png" alt="">
      <img class="chanyexingwang right-icon" src="https://img.hzanchu.com/acimg/2715a62bc290d703112624637ff55fab.png" alt="" @click.stop="toCockpit('2')">
      <img class="shengtaiyiju right-icon" src="https://img.hzanchu.com/acimg/da2d6366ca254ba06d816bd51b8179cc.png" alt="" @click.stop="toCockpit('3')">
      <img class="xiangfengwenming right-icon" src="https://img.hzanchu.com/acimg/54115cdbb2bb206fbcfecabfb48957b1.png" alt="" @click.stop="toCockpit('4')">
      <img class="zhiliyouxiao right-icon" src="https://img.hzanchu.com/acimg/bb1fc1d9bea3c80a272d463200a4c055.png" alt="" @click.stop="toCockpit('5')">
      <img class="shenghuofuyu right-icon" src="https://img.hzanchu.com/acimg/61d19e197ffdeeb5e4f3bd7e2a67478a.png" alt="" @click.stop="toCockpit('6')">

      <!-- 登录弹窗 -->
      <!-- <transition name="fade">
        <div class="login-dialog" v-show="showDialog" @click.stop>
          <div class="input ac-number">
            <img src="../../assets/image/index/index07.png" alt="">
            <el-input v-model="acNumber" placeholder="请输入账号" @keyup.enter.native="login()"></el-input>
          </div>
          <div class="input password">
            <img src="../../assets/image/index/index08.png" alt="">
            <el-input v-model="password" placeholder="请输入密码" @keyup.enter.native="login()"></el-input>
          </div>
          <div class="submit" @click="login()">登录</div>
        </div>
      </transition> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: -20,
        centeredSlides: true,
        loop: true,
        autoplay: true,
      },
      // showDialog: false,
      // acNumber: '',
      // password: '',
      // isLogin: false,
      // admin_info: ''
    }
  },
  mounted() {
    if(localStorage.getItem('token')) {
      this.isLogin = true
      if(localStorage.getItem('admin_info')) {
        this.admin_info = JSON.parse(localStorage.getItem('admin_info'))
        console.log(this.admin_info, 'admin_info')
      }
    } else {
      this.isLogin = false
    }
  },
  methods: {
    // showLoginDialog() {
    //   this.showDialog = true
    // },

    // logout() {
    //   localStorage.clear()
    //   this.$message.info('您已退出登录')
    //   this.isLogin = false
    // },
    toCockpit(value) {
      if(localStorage.getItem('token')) {
        this.$router.push({path: '/newcockpit', query: {value: value}})
      } else {
        this.$message.warning('请先登录')
      }
    },
    toDetail(value) {
      if(value) {
        if(!localStorage.getItem('token')) {
          this.$message.warning('请先登录')
        } else {
          window.open(`${window.location.origin}/cockpit/detail?value=${value}`)
        }
      } else {
        this.$message('即将开放，敬请期待！')
      }
    },
    backhome() {
      this.$router.replace('/dataCenter')
    },
  }
}
</script>

<style lang="scss" scoped>
  .outer {
    background: rgba(11,34,54,1);
    width: 100%;
    height: 100%;
    position: relative;
    background: url(https://img.hzanchu.com/acimg/0489286fa5ff4de9cd877c795ca21684.gif) no-repeat;
    background-size: 100%;
  }

  .handle {
    position: absolute;
    overflow: hidden;
    top: 10%;
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
        transform: rotate(45deg);
        margin: 0 10px;
        transition: all 0.3s;
      }
    }
    div:hover {
      span {
        text-decoration: underline;
      }
      p {
        transform: rotate(135deg)
      }
    }
  }

  .title {
    position: absolute;
    width: 40%;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
  }
  .left {
    position: absolute;
    width: 34%;
    left: 10%;
    top: 40%;
    .content {
      width: 100%;
      height: 100%;
      position: relative;
      .bg {
        width: 100%;
      }
      .icon {
        position: absolute;
        text-align: center;
        width: 8%;
        height: 42%;
        cursor: pointer;
        p {
          font-size: 38px;
          color: #fff;
          font-weight: 600;
          text-align: center;
        }
        img {
          width: 70%;
        }
      }
      .icon1 {
        top: -9%;
        left: 14.6%;
      }
      .icon2 {
        top: -6%;
        right: 13%;
      }
      .icon3 {
        top: 50%;
        left: 14.6%;
      }
      .icon4 {
        top: 44%;
        right: 12.6%;
      }
    }
  }
  .disk {
    position: absolute;
    width: 30%;
    mix-blend-mode: screen;
    left: 56%;
    top: 40%;
  }
  .right-icon {
    width: 7%;
    position: absolute;
    cursor: pointer;
  }
  .chanyexingwang {
    top: 34%;
    left: 57%;
    animation: identifier01 4s ease-in-out infinite;
  }
  .shengtaiyiju {
    top: 34%;
    left: 66%;
    animation: identifier02 4s linear infinite;
  }
  .xiangfengwenming {
    top: 34%;
    left: 75%;
    animation: identifier03 5s ease-in infinite;
  }
  .zhiliyouxiao {
    top: 48%;
    left: 61.5%;
    animation: identifier04 5s linear infinite;
  }
  .shenghuofuyu {
    top: 48%;
    left: 70.5%;
    animation: identifier02 4s linear infinite;
  }
  @keyframes identifier01 {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
  @keyframes identifier02 {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes identifier03 {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes identifier04 {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }

  .login-dialog {
    width: 30%;
    height: 50%;
    background: url('../../assets/image/index/index03.png') no-repeat;
    background-size: 100%;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    .input {
      width: 62%;
      margin: 80px 0 0 276px;
      display: flex;
      align-items: center;
      height: 126px;
      border: 1px solid #6EEFFC;
      img {
        width: 6%;
        margin: 0 20px 0 50px;
      }
      ::-webkit-input-placeholder {
        color: #fff;
      }
    }
    .input:nth-of-type(1) {
      margin-top: 280px;
    }
    .submit {
      width: 62%;
      height: 126px;
      font-size: 38px;
      font-weight: 600;
      font-family: PingFang SC Regular, PingFang SC Regular-Regular;
      font-weight: 400;
      color: #fff;
      background: #46B0E2;
      text-align: center;
      line-height: 126px;
      margin: 180px 0 0 276px;
      cursor: pointer;
    }
  }
</style>

