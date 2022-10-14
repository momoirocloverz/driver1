<template>
  <div class="outer">
    <div class="top">
      <img
        src="https://img.hzanchu.com/acimg/61a36adaa07efc3775713079ab654880.png"
        alt=""
      />
    </div>
    <!-- <canvas id="webgl" class="webgl" style="height: 1016px; background-color: rgb(0, 0, 0); width: 1262px;"></canvas> -->
    <div class="content">
      <div
        :class="['target-value', 'target' + index]"
        v-for="(item, index) in targetValues"
        :key="index"
      >
        <p>{{ item.title }}</p>
        <p>
          <span>{{ item.value }}</span>
          <span>{{ item.unit }}</span>
        </p>
      </div>
      <div class="bottom">
        <div
          class="item"
          v-for="(item, index) in entrances"
          :key="index"
          @click="openNet(item)"
        >
          <img class="icon" :src="item.icon" alt="" />
          <img class="title" :src="item.title" alt="" />
        </div>
      </div>
    </div>

    <!-- 登录 -->
    <transition name="fade">
      <div class="login-module" v-show="showDialog" @click.stop>
        <div class="login-dialog">
          <div class="activeTypeCon">
            <div
              @click="changeActive('1')"
              class="hover"
              :class="[activeIndex == '1' ? 'activeItem' : '']"
            >
              浙政钉扫码
            </div>
            <div
              @click="changeActive('2')"
              class="hover"
              :class="[activeIndex == '2' ? 'activeItem' : '']"
            >
              账号登录
            </div>
          </div>
          <div v-if="activeIndex == '1'">
            <!-- src="https://login.dg-work.cn/oauth2/auth.htm?response_type=code&client_id=phdsjzx_dingoa&redirect_uri=http://pinghu-szgzt-admini.hzanchu.com&scope=get_user_info&authType=QRCODE&embedMode=true"   测试-->
            <iframe
              v-if="showDialog"
              class="loginIFrame"
              src="https://login-pro.ding.zj.gov.cn/oauth2/auth.htm?response_type=code&client_id=phdsjzx_dingoa&redirect_uri=http://pinghu-szgzt-admini.hzanchu.com&scope=get_user_info&authType=QRCODE&embedMode=true"
            ></iframe>
          </div>
          <el-form
            v-if="activeIndex == '2'"
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
          >
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
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </el-form-item>
            <el-form-item prop="captcha">
              <Captcha ref="captcha" />
            </el-form-item>
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <el-button
              :loading="loading"
              type="primary"
              class="submit"
              @click.native.prevent="login('loginForm')"
              >登 录</el-button
            >
          </el-form>
          <div @click="showDialog = false" class="hide">暂不登录</div>
        </div>
      </div>
    </transition>
    <el-dialog
      class="setMiddleDialog cusModal"
      title="浙政钉账号绑定"
      :close-on-click-modal="false"
      :before-close="handleCloseModal"
      :visible.sync="modalVisible"
    >
      <el-form
        :model="newForm"
        status-icon
        :rules="newRules"
        ref="newForm"
        label-width="120px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label=" " prop="userName" class="flexFormItem">
          <el-input
            v-model.trim="newForm.userName"
            maxlength="20"
            placeholder="请输入绑定用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label=" " prop="password" class="flexFormItem">
          <el-input
            v-model.trim="newForm.password"
            type="password"
            show-password
            maxlength="18"
            placeholder="请输入绑定用户密码"
          ></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <div class="twinBtn">
            <button class="bindCodeBtn" @click="e => handleOk('newForm', e)">
              使用绑定浙政钉
            </button>
            <button
              class="resetBindCodeBtn"
              @click="e => resetBindCodeContent('newForm', e)"
            >
              重置
            </button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import md5 from 'js-md5';
import { login, createOpenTicket } from '@/service/user.js';
import Cookies from 'js-cookie';
import Captcha from '@/components/FakeCaptcha/Captcha';
// import {
//   validateUsername,
//   validatePassword,
//   validateBindUserName,
//   validateBindPassword,
//   validateCaptcha
// } from './formValidation';

export default {
  components: { Captcha },
  data() {
    const validateUsername = (rule, value, callback) => {
      console.log(value, 'value');
      var reg = /^[\u4e00-\u9fa5a-zA-Z0-9_-]{0,}$/;
      if (!value) {
        callback(new Error('请输入用户名'));
      } else if (value.trim().length > 20) {
        callback(new Error('请输入20位以内的用户名'));
      } else if (!reg.exec(value)) {
        callback(new Error('您输入的账号中含有非法字符，请重新输入'));
      } else {
        callback();
      }
    };

    const validatePassword = (rule, value, callback) => {
      if (value.length < 6 || value.length > 18) {
        callback(new Error('请输入长度为6-18位的密码'));
      } else {
        callback();
      }
    };

    const validateBindUserName = (rule, value, callback) => {
      if (this.newForm.userName.trim().length > 20) {
        callback(new Error('请输入20位以内的用户名'));
      } else if (!this.newForm.userName.trim().length) {
        callback(new Error('绑定用户名不能为空'));
      } else {
        callback();
      }
    };

    const validateBindPassword = (rule, value, callback) => {
      if (
        this.newForm.password.length < 6 ||
        this.newForm.password.length > 18
      ) {
        callback(new Error('请输入长度为6-18位的密码'));
      } else {
        callback();
      }
    };

    const validateCaptcha = (rule, value, callback) => {
      if (this.$refs.captcha.validate()) {
        callback();
      } else {
        callback(new Error('请输入正确的验证码'));
      }
    };

    return {
      showDialog: false,
      AfterCodeObj: {
        login_type: '3',
        tenantUserId: '',
        accountId: '',
        account: '',
        realmId: '',
        nickname: '',
      },
      qrSource: 'http://pinghu-szgzt-apiadmini.hzanchu.com',
      //   qrSource: 'http://dev-pinghu-jsc-apiweb.hzanchu.com',
      newForm: {
        userName: '',
        password: '',
      },
      newRules: {
        userName: [{ validator: validateBindUserName, trigger: 'blur' }],
        password: [{ validator: validateBindPassword, trigger: 'blur' }],
      },
      modalVisible: false,
      activeIndex: '1',
      Left: 0,
      targetValues: [
        {
          // title: 'https://img.hzanchu.com/acimg/05e32e21e44d898f04d57ef8685d114b.png?x-oss-process=image/resize,l_300',
          title: '农业总产值',
          value: '25.41',
          unit: '亿元',
          top: '',
          left: '',
        },
        {
          // title: 'https://img.hzanchu.com/acimg/6c7acd7a1e7de8f4be0cf61f17e6a686.png?x-oss-process=image/resize,l_300',
          title: '农业增加值增速',
          value: '2.7',
          unit: '%',
          top: '',
          left: '',
        },
        {
          // title: 'https://img.hzanchu.com/acimg/b044806d902be70fb16e874de11c08a4.png?x-oss-process=image/resize,l_300',
          title: '农业招商引资总投资额',
          value: '5.7',
          unit: '亿元',
          top: '',
          left: '',
        },
        {
          // title: 'https://img.hzanchu.com/acimg/206776fbdaec25f19a6cadea59560157.png?x-oss-process=image/resize,l_300',
          title: '农业固定资产投资',
          value: '3.1',
          unit: '亿元',
          top: '',
          left: '',
        },
        {
          // title: 'https://img.hzanchu.com/acimg/9624b0f548542fcaa6e6f38210cc3178.png',
          title: '农村人均可支配收入',
          value: '43914',
          unit: '元',
          top: '',
          left: '',
        },
      ],
      entrances: [
        {
          icon:
            'https://img.hzanchu.com/acimg/a024682513787cffa5d6cbecf159b9c2.png?x-oss-process=image/resize,l_300',
          title:
            'https://img.hzanchu.com/acimg/2b73dca5d0687639b261034e0beddbeb.png?x-oss-process=image/resize,l_300',
          // path: 'https://ph.anchu.cn/shareScreen/eyJzY3JlZW5JZCI6Mjc0M30=?ticket=88977e3025e86c3d96ff763ba739aef7',
          path: '/dataAssets'
        },
        {
          icon:
            'https://img.hzanchu.com/acimg/70d4118d02221b0b729c18bcfb3c4f56.png?x-oss-process=image/resize,l_300',
          title:
            'https://img.hzanchu.com/acimg/6d7409fd1c3e495f6817dd876b3dc725.png?x-oss-process=image/resize,l_300',
          path: '/newcockpit',
        },
        {
          icon:
            'https://img.hzanchu.com/acimg/10dcbed1b9a8d6355f24765d5f39e004.png?x-oss-process=image/resize,l_300',
          title:
            'https://img.hzanchu.com/acimg/165a20794a72e309dc5065e88521b8f4.png?x-oss-process=image/resize,l_300',
          path: 'http://pinghu-szxt-admini.zjsszxc.com/',
        },
        {
          icon:
            'https://img.hzanchu.com/acimg/439dcc19cd628aff917807cc82cbb3bc.png?x-oss-process=image/resize,l_300',
          title:
            'https://img.hzanchu.com/acimg/2a5cd51c2adbc93821ee15e20affecb3.png?x-oss-process=image/resize,l_300',
          path: '/AppCenter',
        },
        {
          icon:
            'https://img.hzanchu.com/acimg/d1da9c36bab3f067f384cc86aae4f0fc.png?x-oss-process=image/resize,l_300',
          title:
            'https://img.hzanchu.com/acimg/9b970d7c0a94ec84ccbaa92df8880553.png?x-oss-process=image/resize,l_300',
          path: 'https://rdos.anchu.cn/portal/#/',
        },
        {
          icon:
            'https://img.hzanchu.com/acimg/6cf5c627c45ab9cf7ba9d9b16e9efee7.png?x-oss-process=image/resize,l_300',
          title:
            'https://img.hzanchu.com/acimg/3e0afa5a477220cd5d4570c846175b4c.png?x-oss-process=image/resize,l_300',
          path: 'http://zrzy.phxmgl.cn/pinghu-web/index.html',
        },
      ],
      times: 0,
      setTime: '',
      timeOut: '',
      isLogin: false,
      showDialog: false,
      loginForm: {
        username: '',
        password: '',
        captcha: '',
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername },
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword },
        ],
        captcha: [
          { required: true, validator: validateCaptcha, trigger: 'blur' },
        ],
      },
      loading: false,
      passwordType: 'password',
      checked: true,
      toUrl: '',
    };
  },
  mounted() {
    // 记住密码
    let accountInfo = Cookies.get('accountInfo');
    console.log(accountInfo, 'accountInfo');
    if (accountInfo) {
      this.loginForm = JSON.parse(accountInfo);
    }
    // 验证登录状态
    if (localStorage.getItem('token')) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    console.log(this.isLogin, 'islogin');
    this.initEnv();
    this.initParticle();
  },
  methods: {
    initEnv() {
      console.log(process.env);
      if (process.env.NODE_ENV == 'production') {
        this.qrSource = 'http://pinghu-szgzt-apiadmini.zjsszxc.com';
        // if (process.env.VUE_APP_TITLE == 'prod') {
        //   this.qrSource = 'http://pinghu-szgzt-apiadmini.zjsszxc.com';
        // } else {
        //   this.qrSource = 'http://pinghu-szgzt-apiadmini.hzanchu.com';
        // }
      }
    },
    handleOk(formName, e) {
      e.preventDefault();
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.AfterCodeObj.password = md5(this.newForm.password);
          this.AfterCodeObj.user_name = this.newForm.userName;
          login(this.AfterCodeObj).then(res => {
            if (res.code == 0) {
              localStorage.setItem('token', res.data.token);
              localStorage.setItem(
                'admin_info',
                JSON.stringify(res.data.admin_info),
              );
              this.$message.success('登录成功');
              this.showDialog = false;
              this.isLogin = true;
              // this.$router.push(this.toUrl)
              sessionStorage.removeItem('qrResponseCode');
              clearInterval(window.timer1);
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    resetBindCodeContent(formName, e) {
      e.preventDefault();
      this.$refs[formName].resetFields();
    },
    handleCloseModal() {
      this.modalVisible = false;
      this.$refs.newForm.resetFields();
    },
    changeActive(index) {
      this.activeIndex = index;
      if (index == '1') {
        window.timer1 = setInterval(() => {
          let qrResponseCode = sessionStorage.getItem('qrResponseCode')
            ? sessionStorage.getItem('qrResponseCode')
            : '';
          console.log('qrResponseCode', qrResponseCode);
          if (qrResponseCode) {
            if (qrResponseCode != 'undefined' || qrResponseCode != undefined) {
              clearInterval(window.timer1);
              fetch(`${this.qrSource}/admin/zhezd/get_access_token`, {
                method: 'POST',
              })
                .then(response => response.json())
                .catch(err => {
                  console.log('err', err);
                })
                .then(res => {
                  console.log(res);
                  if (res.code == 0) {
                    if (res.data.success) {
                      if (res.data.content.success) {
                        var formData = new FormData();
                        formData.append(
                          'access_token',
                          res.data.content.data.accessToken,
                        );
                        formData.append('code', qrResponseCode);
                        fetch(
                          `${this.qrSource}/admin/zhezd/get_userinfo_by_bode`,
                          {
                            method: 'POST',
                            body: formData,
                          },
                        )
                          .then(response1 => response1.json())
                          .catch(err1 => {
                            console.log(err1);
                          })
                          .then(res1 => {
                            console.log(res1);
                            if (res1.code === 0) {
                              if (res1.data.success) {
                                if (res1.data.content.success) {
                                  login({
                                    login_type: '3',
                                    tenantUserId:
                                      res1.data.content.data.tenantUserId,
                                    accountId: res1.data.content.data.accountId,
                                    account: res1.data.content.data.account,
                                    realmId: res1.data.content.data.realmId,
                                    nickname: res1.data.content.data.nickNameCn,
                                  })
                                    .then(res2 => {
                                      console.log(res2);
                                      if (res2.code === 0) {
                                        localStorage.setItem(
                                          'token',
                                          res2.data.token,
                                        );
                                        localStorage.setItem(
                                          'admin_info',
                                          JSON.stringify(res2.data.admin_info),
                                        );
                                        this.$message.success('登录成功');
                                        this.showDialog = false;
                                        this.isLogin = true;
                                        this.$router.push(this.toUrl);
                                        sessionStorage.removeItem(
                                          'qrResponseCode',
                                        );
                                        clearInterval(window.timer1);
                                        // if (res2.data.accountType == 2) {
                                        //   this.AfterCodeObj = {
                                        //     login_type: '3',
                                        //     tenantUserId:
                                        //       res1.data.content.data
                                        //         .tenantUserId,
                                        //     accountId:
                                        //       res1.data.content.data.accountId,
                                        //     account:
                                        //       res1.data.content.data.account,
                                        //     realmId:
                                        //       res1.data.content.data.realmId,
                                        //     nickname:
                                        //       res1.data.content.data.nickNameCn,
                                        //   };
                                        //   this.modalVisible = true;
                                        // //   this.$message.info('需要绑定账号');
                                        // } else {
                                        //   localStorage.setItem(
                                        //     'token',
                                        //     res2.data.token,
                                        //   );
                                        //   localStorage.setItem(
                                        //     'admin_info',
                                        //     JSON.stringify(
                                        //       res2.data.admin_info,
                                        //     ),
                                        //   );
                                        //   this.$message.success('登录成功');
                                        //   this.showDialog = false;
                                        //   this.isLogin = true;
                                        //   this.$router.push(this.toUrl);
                                        //   sessionStorage.removeItem(
                                        //     'qrResponseCode',
                                        //   );
                                        //   clearInterval(window.timer1);
                                        // }
                                      } else {
                                        this.$message.error(res2.msg);
                                      }
                                    })
                                    .catch(err2 => {
                                      this.$message.error(res1.msg);
                                    });
                                } else {
                                  this.$message.error(
                                    res1.data.content.responseMessage,
                                  );
                                  sessionStorage.removeItem('qrResponseCode');
                                  this.changeActive('1');
                                }
                              } else {
                                this.$message.error(res1.msg);
                              }
                            } else {
                              this.$message.error(res1.msg);
                            }
                          });
                      } else {
                        this.$message.error(res.data.content.responseMessage);
                      }
                    } else {
                      this.$message.error(res.msg);
                    }
                  } else {
                    this.$message.error(res.msg);
                  }
                });
            }
          }
        }, 900);
      } else {
        sessionStorage.removeItem('qrResponseCode');
        clearInterval(window.timer1);
      }
    },
    // init() {
    //   this.list.map((item, index) => {
    //     item.top = this.position_group[this.times].data[index].top
    //     item.left = this.position_group[this.times].data[index].left
    //   })
    // },
    openNet(item) {
      if (item.path.indexOf('http') >= 0) {
        if (!this.isLogin) {
          this.showDialog = true;
          sessionStorage.removeItem('qrResponseCode');
          clearInterval(window.timer1);
          this.changeActive('1');
        } else {
          // window.open(url);
          createOpenTicket().then(res => {
            if (res.code === 0) {
              window.open(item.path + '?ticket=' + res.data.ticket);
            } else {
              window.open(item.path);
              console.warn('请登录');
            }
          });
        }
      } else {
        if (item.path === '/newcockpit') {
          if (!this.isLogin) {
            this.showDialog = true;
            this.toUrl = item.path;
            sessionStorage.removeItem('qrResponseCode');
            clearInterval(window.timer1);
            this.changeActive('1');
          } else {
            this.$router.push(item.path);
          }
        } else {
          window.open(`${window.location.origin}${item.path}`);
        }
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    /**
     * todo 登录
     */
    login(formName) {
      if (this.checked) {
        Cookies.set('accountInfo', this.loginForm);
      } else {
        Cookies.set('accountInfo', '');
      }
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const _data = await login({
            user_name: this.loginForm.username,
            password: md5(this.loginForm.password),
          });
          if (_data.code === 0) {
            localStorage.setItem('token', _data.data.token);
            localStorage.setItem(
              'admin_info',
              JSON.stringify(_data.data.admin_info),
            );
            // this.admin_info = _data.data.admin_info;
            this.$message.success('登录成功');
            // this.$router.replace('/recordsCenter')
            this.showDialog = false;
            this.isLogin = true;
            sessionStorage.removeItem('qrResponseCode');
            clearInterval(window.timer1);
          } else {
            this.$message.error(_data.msg);
          }
        } else {
          console.log('error!');
          return;
        }
      });
    },
    initParticle() {
      var canvas = document.getElementById('webgl');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      var gl = canvas.getContext('webgl');
      var vertexShaderSource = document.getElementById('vertexShader')
        .innerText;

      var fragShaderSource = document.getElementById('fragmentShader')
        .innerText;
      console.log(vertexShaderSource, fragShaderSource, 'fragShaderSource');
      var program = initShader(gl, vertexShaderSource, fragShaderSource);

      var aposLocation = gl.getAttribLocation(program, 'position');
      var scale = gl.getAttribLocation(program, 'scale');

      var modelViewMatrixLoc = gl.getUniformLocation(
        program,
        'modelViewMatrix',
      );
      var projectionMatrixLoc = gl.getUniformLocation(
        program,
        'projectionMatrix',
      );

      var SEPARATION = 70,
        AMOUNTX = 50,
        AMOUNTY = 50;
      var numParticles = AMOUNTX * AMOUNTY;

      var positions = new Float32Array(numParticles * 3);
      var scales = new Float32Array(numParticles);

      var i = 0,
        j = 0;

      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
          positions[i + 1] = 0; // y
          positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z
          scales[j] = 1;
          i += 3;
          j++;
        }
      }

      var colorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, scales, gl.STATIC_DRAW);
      gl.vertexAttribPointer(scale, 1, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(scale);

      var buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
      gl.vertexAttribPointer(aposLocation, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(aposLocation);

      gl.enable(gl.DEPTH_TEST);

      var width = window.innerWidth; //
      var height = window.innerHeight; //
      var camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
      camera.position.set(200, 300, 200); //

      camera.position.set(944, 206, -262);
      camera.lookAt(new THREE.Vector3(0, 0, 0)); //()
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld(true);

      var width = window.innerWidth; //
      var height = window.innerHeight; //
      var mat4 = new THREE.Matrix4();
      mat4.copy(camera.projectionMatrix);

      var mxArr = new Float32Array(mat4.elements);

      gl.uniformMatrix4fv(projectionMatrixLoc, false, mxArr);

      var mat4y = new THREE.Matrix4();

      mat4y.copy(camera.matrixWorldInverse);

      console.log(camera.matrixWorldInverse);
      var myArr = new Float32Array(mat4y.elements);

      gl.uniformMatrix4fv(modelViewMatrixLoc, false, myArr);

      var count = 0;
      var mouseX = 0,
        mouseY = 0;

      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;

      function draw() {
        camera.position.x += (mouseX - camera.position.x) * 0.01;

        camera.updateMatrixWorld(true);
        mat4y.copy(camera.matrixWorldInverse);

        var myArr = new Float32Array(mat4y.elements);
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, myArr);

        var i = 0,
          j = 0;

        for (var ix = 0; ix < AMOUNTX; ix++) {
          for (var iy = 0; iy < AMOUNTY; iy++) {
            positions[i + 1] =
              Math.sin((ix + count) * 0.3) * 50 +
              Math.sin((iy + count) * 0.5) * 50;
            scales[j] =
              (Math.sin((ix + count) * 0.3) + 1.3) * 8 +
              (Math.sin((iy + count) * 0.5) + 1.3) * 8;
            i += 3;
            j++;
          }
        }
        count += 0.08;

        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, scales, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        requestAnimationFrame(draw);

        gl.drawArrays(gl.POINTS, 0, 2500);
      }
      draw();

      function initShader(gl, vertexShaderSource, fragmentShaderSource) {
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        gl.compileShader(vertexShader);
        gl.compileShader(fragmentShader);
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        return program;
      }

      // document.addEventListener('mousemove', onDocumentMouseMove, false);
      // document.addEventListener('touchstart', onDocumentTouchStart, false);
      // document.addEventListener('touchmove', onDocumentTouchMove, false);

      // function onDocumentMouseMove(event) {

      //   mouseX = event.clientX - windowHalfX;
      //   mouseY = event.clientY - windowHalfY;

      // }

      // function onDocumentTouchStart(event) {

      //   if (event.touches.length === 1) {

      //     event.preventDefault();

      //     mouseX = event.touches[0].pageX - windowHalfX;
      //     mouseY = event.touches[0].pageY - windowHalfY;

      //   }

      // }

      // function onDocumentTouchMove(event) {

      //   if (event.touches.length === 1) {

      //     event.preventDefault();

      //     mouseX = event.touches[0].pageX - windowHalfX;
      //     mouseY = event.touches[0].pageY - windowHalfY;

      //   }

      // }

      // var doc1 = document.getElementById("doc1");
      // var doc2 = document.getElementById("doc2");
      // var doc3WebGL = document.getElementById("doc3WebGL");
      // var width = window.innerWidth;
      // var height = window.innerHeight;

      // var mid = width/ 2 - 160 / 2; //中间位置
      // 两侧分别平移150
      // doc1.style.left = mid - 150 + "px";
      // doc2.style.left = mid + 150 + "px";
      // doc3WebGL.style.left = mid  + "px";

      // doc1.style.top = height / 3*0.9 + "px";
      // doc2.style.top = height / 3*0.9 + "px";
      // doc3WebGL.style.top = height / 3*0.9 +100+ "px";
      window.onresize = function() {
        // var canvas = document.getElementById('webgl');
        // console.log('?????????',window.innerWidth);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        mat4.copy(camera.projectionMatrix);
        var mxArr = new Float32Array(mat4.elements);
        gl.uniformMatrix4fv(projectionMatrixLoc, false, mxArr);

        var width = window.innerWidth;
        var height = window.innerHeight;

        var mid = width / 2 - 160 / 2; //中间位置
        // 两侧分别平移150
        // doc1.style.left = mid - 150 + "px";
        // doc2.style.left = mid + 150 + "px";
        // doc3WebGL.style.left = mid + "px";

        // doc1.style.top = height / 3*0.9 + "px";
        // doc2.style.top = height / 3*0.9 + "px";
        // doc3WebGL.style.top = height / 3*0.9 +100+ "px";
        // canvas.style.width = window.innerWidth + "px";
        // canvas.style.height = window.innerHeight + "px";
      };
    },
  },
  destroyed() {
    clearInterval(this.setTime);
    sessionStorage.removeItem('qrResponseCode');
    clearInterval(window.timer1);
  },
};
</script>

<style scoped lang="scss">
.outer {
  height: 100%;
  background: #050b22;
  position: relative;
}
.top {
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 99;
  img {
    width: 100%;
  }
}

.content {
  width: 4560px;
  height: 100%;
  margin: 0 auto;
  position: relative;
  background: url(https://img.hzanchu.com/acimg/ddbd9a62946903074db24b2bb92bd389.png)
    no-repeat;
  background-size: 100% 100%;
}
.target-value {
  text-align: center;
  position: absolute;
  p {
    &:nth-of-type(1) {
      font-size: 48px;
      font-family: Microsoft YaHei;
      font-weight: 600;
      color: #fff;
      line-height: 68px;
    }
    &:nth-of-type(2) {
      font-family: PangMenZhengDao;
      font-weight: 400;
      font-size: 33px;
      color: #6bfff3;
      span:nth-of-type(1) {
        font-size: 67px;
      }
    }
  }
}
.target0 {
  top: 25vh;
  left: 26%;
  opacity: 0.5;
  animation: data-one 3s ease-in-out infinite;
}
@keyframes data-one {
  0% {
    top: 25vh;
    opacity: 0.5;
  }
  50% {
    top: 23vh;
    opacity: 1;
  }
  100% {
    top: 25vh;
    opacity: 0.5;
  }
}
.target1 {
  top: 22vh;
  left: 50%;
  animation: data-two 2.5s ease-in-out infinite;
}
@keyframes data-two {
  0% {
    top: 22vh;
    opacity: 0.5;
  }
  50% {
    top: 20vh;
    opacity: 1;
  }
  100% {
    top: 22vh;
    opacity: 0.5;
  }
}
.target2 {
  top: 52vh;
  left: 27%;
  animation: data-three 3.2s ease-in-out infinite;
}
@keyframes data-three {
  0% {
    top: 52vh;
    opacity: 0.5;
  }
  50% {
    top: 50vh;
    opacity: 1;
  }
  100% {
    top: 52vh;
    opacity: 0.5;
  }
}
.target3 {
  top: 42vh;
  left: 56%;
  animation: data-four 2.5s ease-in-out infinite;
}
@keyframes data-four {
  0% {
    top: 40vh;
    opacity: 0.5;
  }
  50% {
    top: 38vh;
    opacity: 1;
  }
  100% {
    top: 40vh;
    opacity: 0.5;
  }
}
.target4 {
  top: 42vh;
  left: 71%;
  animation: data-five 3.5s ease-in-out infinite;
}
@keyframes data-five {
  0% {
    top: 42vh;
    opacity: 0.5;
  }
  50% {
    top: 40vh;
    opacity: 1;
  }
  100% {
    top: 42vh;
    opacity: 0.5;
  }
}

.bottom {
  position: absolute;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  bottom: 3vh;
  justify-content: center;
  .item {
    width: 25vh;
    height: 30vh;
    background: url('https://img.hzanchu.com/acimg/1ecebb5d195450c44338f94b61e1e5ca.png?x-oss-process=image/resize,l_300')
      no-repeat;
    background-size: 100%;
    text-align: center;
    margin-left: 60px;
    cursor: pointer;
    .icon {
      height: 10vh;
      display: block;
      margin: 5vh auto 0;
    }
    .title {
      height: 2.6vh;
      display: block;
      margin: 2vh auto 0;
    }
  }
  .item:nth-of-type(2) {
    .title {
      height: 4.2vh;
    }
  }
  .item:nth-of-type(6) {
    .title {
      height: 6.4vh;
    }
  }
}

.bindCodeBtn {
  width: 47%;
  height: 110px;
  background-color: #20a3f5;
  border-color: #20a3f5;
  border: none;
  color: #fff;
  font-size: 40px;
  cursor: pointer;

  &[disabled] {
    background-color: #ccc;
    cursor: not-allowed;
  }
}
.twinBtn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}
.loginIFrame {
  border: none;
  width: 680px;
  height: 780px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 40px;
}
.activeTypeCon {
  margin-top: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: 48px;
  text-align: center;
  color: #fff;
  line-height: 50px;
}
.activeItem {
  color: #fff;
  position: relative;
  &::after {
    content: '';
    height: 6px;
    width: 240px;
    background-color: #fff;
    position: absolute;
    left: 10px;
    bottom: 0;
    border-radius: 4px;
  }
}
.hover {
  cursor: pointer;
  text-align: center;
  padding-bottom: 20px;
  box-sizing: border-box;
  margin-right: 100px;
  width: 260px;
  &:last-child {
    margin-right: 0;
  }
}
.login-module {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.login-dialog {
  width: 30%;
  min-height: 1240px;
  padding-bottom: 80px;
  background: url('https://img.hzanchu.com/acimg/9de6acd21f6d05db4f05b5fa08e368ab.png')
    no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  .login-form {
    width: 60%;
    margin: 0 auto 0;
    overflow: hidden;
    .submit {
      width: 100%;
      margin: 100px auto 0;
    }
  }
}
.hide {
  font-size: 36px;
  color: #fff;
  text-align: center;
  margin-top: 50px;
  cursor: pointer;
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
    border-bottom: 1px solid #409eff;
  }
  .el-table::before {
    background: none;
  }
  input:-internal-autofill-selected {
    background-color: transparent !important;
  }
}
</style>
