<template>
  <div class="outer">
    <div class="content">
      <header-handle></header-handle>
      <div class="nav-left">
        <div v-for="(item, nav) in navList" :key="nav" @click="toSelect(item)">
          <span :style="{color: select_id === item.type ? '#00AEFF' : '#7FA6C3'}">{{item.name}}</span>
          <img class="icon" :src="item.icon" alt="">
          <img class="icon-select" :style="{right: select_id === item.type ? '6px' : '100px', opacity: select_id === item.type ? '1' : '0'}" :src="item.icon_select" alt="">
          <img class="huan" :style="{right: select_id === item.type ? '-7%' : '10%', opacity: select_id === item.type ? '1' : '0'}" src="https://img.hzanchu.com/acimg/51c471980e6831d429ed2e9363d1c241.png" alt="">
        </div>
      </div>
      <div class="right" v-show="List.length">
        <div v-for="(item, index) in List" :key="index" class="item">
          <el-popover
            placement="right"
            :width="320"
            trigger="click"
          >
            <div slot="reference" class="image">
              <img :src="item.qrcode ? item.qrcode : 'https://img.hzanchu.com/acimg/711def3edaeead477a742abd792d6ae3.png'" alt="">
            </div>
            <img style="width:300px;" :src="item.qrcode ? item.qrcode : 'https://img.hzanchu.com/acimg/4a604a1ef9d1941118461dac325dbddd.png'" alt="">
          </el-popover>

          <div class="info">
            <p>{{item.title}}</p>
            <p>{{item.subtitle || ''}}</p>
            <img :src="item.sub[0].url ? 'https://img.hzanchu.com/acimg/907286c8ed801361a5de710c399e39b5.png' : 'https://img.hzanchu.com/acimg/9e6154f5a71f6b3933935f5efdc2ddfd.png'" alt="" @click="toDetail(item)">
          </div>
        </div>
      </div>

      <div class="empty" v-show="!List.length">
        暂无应用
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          icon: 'https://img.hzanchu.com/acimg/91251a8ffaba0567b364221bacebd16a.png',
          icon_select: 'https://img.hzanchu.com/acimg/46cf92d5a5a3f8495db1d177be188892.png',
          name: '全部',
          type: '0'
        },
        {
          icon: 'https://img.hzanchu.com/acimg/bb08cb122fce57b4a8199c1b1e198add.png',
          icon_select: 'https://img.hzanchu.com/acimg/5e948af6cc0fcb9aa51d48e6e6842fc2.png',
          name: '生产管理',
          type: '1'
        },
        {
          icon: 'https://img.hzanchu.com/acimg/01b57ba79f2bf6462374b36fdfccec01.png',
          icon_select: 'https://img.hzanchu.com/acimg/d8a10c368eb30de2d05e77b6102add9d.png',
          name: '流通营销',
          type: '2'
        },
        {
          icon: 'https://img.hzanchu.com/acimg/9cdee9c774e7ed362d0e5a007ebf6fff.png',
          icon_select: 'https://img.hzanchu.com/acimg/1264d34b45f98e8a350410f99815c4d3.png',
          name: '行业监管',
          type: '3'
        },
        {
          icon: 'https://img.hzanchu.com/acimg/91251a8ffaba0567b364221bacebd16a.png',
          icon_select: 'https://img.hzanchu.com/acimg/46cf92d5a5a3f8495db1d177be188892.png',
          name: '公共服务',
          type: '4'
        },
        {
          icon: 'https://img.hzanchu.com/acimg/535f35dd21eb9068b0e19a595dbad28a.png',
          icon_select: 'https://img.hzanchu.com/acimg/0666344629ab861091368ef31e3479a6.png',
          name: '乡村治理',
          type: '5'
        },
      ],
      select_id: '0',
      List: [],
      shengchanguanli: [
        {
          title: '金桥数字牧场',
          subtitle: '金桥数字牧场',
          qrcode: '',
          sub: [
            {text: '平台系统', target: '', url: 'http://180.110.63.148:8005/#/'}
          ]
        },
        {
          title: '立体循环',
          subtitle: '数字农业工厂',
          qrcode: '',
          sub: [
            {text: '平台系统', target: '', url: ''}
          ]
        },
        {
          title: '绿迹数字农业工厂',
          qrcode: '',
          sub: [
            {text: '平台系统', target: '', url: 'https://dl.bizmsg.net/nzy/nzy.html'}
          ]
        },
        {
          title: '东郁国际种源数字工厂',
          qrcode: '',
          sub: [
            {text: '平台系统', target: '', url: ''}
          ]
        },
        {
          title: '数字生态农业园区',
          qrcode: '',
          sub: [
            {text: '平台系统', target: '', url: ''}
          ]
        },
        {
          title: '统防统治智能化服务平台',
          qrcode: '',
          sub: [
            {text: '平台系统', target: '', url: ''}
          ]
        },
      ],
      liutongyingxiao: [
        {
          title: '本家鲜',
          qrcode: 'https://img.hzanchu.com/acimg/547df3e5e212cd8619cc5b7665a4b3ca.png',
          sub: [
            {text: '后台管理系统', target: '', url: 'https://admini.phbjx.com'},
            {text: '宣传视频', target: '', url: ''},
          ]
        },
        {
          title: '网上农博·平湖馆',
          qrcode: 'https://img.hzanchu.com/acimg/dd944aaa2d6788d34e67de43ce49068a.png',
          sub: [
            {text: '平湖馆专题', target: '', url: 'https://wsnb.hzanchu.com/subject/actual/272'},
            {text: '宣传视频', target: '', url: 'https://vedio.hzanchu.com/155b748186ec4ddfa91092ae08e07ea9/44b3021262ee4d05affc26dc77146cfe-5b494e49e7a551106ce22a4a20c46fb2-ld.mp4'}
          ]
        },
        // {
        //   title: '集配宝',
        //   qrcode: '',
        //   sub: [
        //     {text: '平台系统', target: '', url: ''}
        //   ]
        // },
        {
          title: '“金平湖”农产品物联中心',
          qrcode: '',
          sub: [
            {text: '平台系统', target: '', url: ''}
          ]
        },
      ],
      hangyejianguan: [
        {
          title: '农合联肥药两制监管平台',
          qrcode: 'https://img.hzanchu.com/acimg/21571d08f3c032d78710077cacf7c9f5.png',
          sub: [
            {text: '平台系统', target: '', url: 'http://121.42.25.6:8800/nhl/login.html'},
          ]
        },
        {
          title: '农产品质量安全监管平台',
          qrcode: 'https://img.hzanchu.com/acimg/0005703655aad97df2b7dc322423eb70.png',
          sub: [
            {text: '平台系统', target: '', url: 'http://apt.zjagri.gov.cn'}
          ]
        },
        {
          title: '乡村生态系统',
          subtitle: '监测平台',
          qrcode: 'https://img.hzanchu.com/acimg/47c04ce6e862e6856930af24540cb1bc.png',
          sub: [
            {text: '平台系统', target: '', url: 'http://www.smtrap.com'},
            // {text: '物联网云平台', target: '', url: 'http://wlw2.zjtpyun.com//things/scene?landid=8991'}
          ]
        },
        {
          title: '乡村生态系统',
          subtitle: '物联网云平台',
          qrcode: 'https://img.hzanchu.com/acimg/47c04ce6e862e6856930af24540cb1bc.png',
          sub: [
            // {text: '平台系统', target: '', url: 'http://www.smtrap.com'},
            {text: '物联网云平台', target: '', url: 'http://wlw2.zjtpyun.com//things/scene?landid=8991'}
          ]
        },
        {
          title: '粮补化肥定额系统',
          qrcode: 'https://img.hzanchu.com/acimg/ef76304bc022a5620c9ae9e8301d5b9e.png',
          sub: [
            {text: '平台系统', target: '', url: 'http://59.110.25.131:83/webpub/app-pinghu/login/login.html'}
          ]
        },
        {
          title: '尾水全域治理',
          subtitle: '智能系统',
          qrcode: 'https://img.hzanchu.com/acimg/c13eb2bfbdb1b5fbec17659d4297b1cf.png',
          sub: [
            {text: '平台系统', target: '', url: 'http://phyyszh.com:8081/pinghyy/'}
          ]
        },
        {
          title: '肥药两治数字化',
          qrcode: 'https://img.hzanchu.com/acimg/64cb741351466cb6d1ec3ae56a1e7283.png',
          sub: [
            {text: '平台系统', target: '', url: 'https://fylz.zjapt.com/zhejiang/pub/login/initLogin.xhtml'}
          ]
        },
        {
          title: '渔船精密智控',
          qrcode: 'https://img.hzanchu.com/acimg/452f5b6228ba2d55e5668bdf67f1ba40.png',
          sub: [
            {text: '平台系统', target: '', url: 'https://ycjg.zjagri.cn:20009/pages/regulatory.html'}
          ]
        }
      ],
      gonggongfuwu: [
        {
          title: '浙农服',
          qrcode: 'https://img.hzanchu.com/acimg/016b7f166d59cae063e5264436b7d740.png',
          sub: [
            {text: '平台系统', target: '', url: 'https://pinghu.zjsznhl.com.cn/'}
          ]
        },
        {
          title: '农机社会化服务智管平台',
          qrcode: 'https://img.hzanchu.com/acimg/f7f067a4ca18ad473d4c2d2d1dcb1822.png',
          sub: [
            {text: '平台系统', target: '', url: 'http://47.97.9.222/agriMach/manage/login/page'}
          ]
        },
        {
          title: '浙农补',
          qrcode: 'https://img.hzanchu.com/acimg/2900758e3e52a79b94c43c57eda4620d.png',
          sub: [
            {text: '平台系统', target: '', url: 'https://m.wsnf.cn/foodSubsidies/index'}
          ]
        },
        {
          title: '美丽乡村',
          qrcode: '',
          sub: [
            {text: '即将开放，敬请期待', target: '', url: ''}
          ]
        },
        {
          title: '农业供应链金融系统',
          qrcode: '',
          sub: [
            {text: '即将开放，敬请期待', target: '', url: ''}
          ]
        },
        {
          title: '美丽乡村数字服务',
          qrcode: '',
          sub: [
            {text: '即将开放，敬请期待', target: '', url: ''}
          ]
        },
      ],
      xiangcunzhili: [
        {
          title: '善治宝',
          qrcode: 'https://img.hzanchu.com/acimg/565a44c686b4e51708a59b4f94743fe6.png',
          sub: [
            {text: '后台管理系统', target: '', url: 'https://admini.wsnf.cn'},
            {text: '宣传视频', target: '', url: ''},
          ]
        },
        {
          title: '数字农开平台',
          qrcode: 'https://img.hzanchu.com/acimg/d1e49455e6bbbf09485f5bdc579e1b38.png',
          sub: [
            {text: '平台系统', target: '', url: 'http://125.124.104.84:9001/ '}
          ]
        },
        {
          title: '农村集体“三资”管理',
          qrcode: 'https://img.hzanchu.com/acimg/af85f87d20a36c23aa31236f421b7f70.png',
          sub: [
            {text: '平台系统', target: '', url: 'https://zjnj.zjagri.gov.cn/accountNjWeb/#/login?redirect=%2Fhome'}
          ]
        },
        {
          title: '低收入农户帮扶集成',
          qrcode: 'https://img.hzanchu.com/acimg/f4b5040c5ee4cbbcaf6c1e6218c65677.png',
          sub: [
            {text: '平台系统', target: '', url: 'http://223.4.71.171/'}
          ]
        },
      ],
    }
  },
  mounted() {
    this.List = this.shengchanguanli.concat(this.liutongyingxiao).concat(this.hangyejianguan).concat(this.gonggongfuwu).concat(this.xiangcunzhili);
  },
  methods: {
    toDetail(item) {
      if(item.sub.length && item.sub[0].url) {
        window.open(item.sub[0].url);
      } else {
        this.$message('即将开放，敬请期待！')
      }
    },
    toSelect(item) {
      this.select_id = item.type
      switch(this.select_id) {
        case '0':
          this.List = this.shengchanguanli.concat(this.liutongyingxiao).concat(this.hangyejianguan).concat(this.gonggongfuwu).concat(this.xiangcunzhili);
          break

        case '1':
          this.List = this.shengchanguanli
          break

        case '2':
          this.List = this.liutongyingxiao
          break

        case '3':
          this.List = this.hangyejianguan
          break

        case '4':
          this.List = this.gonggongfuwu
          break

        case '5':
          this.List = this.xiangcunzhili
          break

        default:
          this.List = []
      }
      // if(this.select_id == '2') {
      //   this.List = this.liutongyingxiao
      // } else if(this.select_id == '5') {
      //   this.List = this.xiangcunzhili
      // } else {
      //   this.List = []
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
  .outer {
    background: rgba(11,34,54,1);
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .content {
    width: 100%;
    height: 100%;
    background: url(https://img.hzanchu.com/acimg/1515761d6dda6c4ca13e8056c925779e.png) no-repeat;
    background-size: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 5%;
  }
  .nav-left {
    position: absolute;
    left: 252px;
    top: 365px;
    height: 76vh;
    overflow-y: auto;
    padding: 50px 0 150px 0;
    width: 1000px;
    div {
      width: 736px;
      height: 185px;
      background: url(https://img.hzanchu.com/acimg/b50844f6f775f3ae5feae144797aa8f9.png) no-repeat;
      background-size: 100%;
      position: relative;
      margin-bottom: 136px;
      cursor: pointer;
      span {
        font-size: 48px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: 400;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 270px;
        transition: all 0.3s;
      }
      .icon {
        height: 93px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 48px;
      }
      .huan {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 242px;
        opacity: 0;
        transition: all 0.3s;
      }
      .icon-select {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 50px;
        height: 100px;
        z-index: 90;
        opacity: 0;
        transition: all 0.3s;
      }
    }
    div:last-child {
      margin-bottom: 0;
    }
  }
  .right {
    width: 3200px;
    max-height: 76vh;
    overflow-y: auto;
    position: absolute;
    padding-bottom: 200px;
    top: 405px;
    left: 30%;
    .item {
      width: 938px;
      height: 508px;
      background: url(https://img.hzanchu.com/acimg/4ae0995f59aadfc85e1bbeef8477cdb0.png) no-repeat;
      background-size: 100%;
      float: left;
      margin: 0 86px 86px 0;
      .image {
        width: 210px;
        height: 210px;
        position: relative;
        overflow: hidden;
        border-radius: 50%;
        float: left;
        margin: 80px 0 0 80px;
        img {
          width: 100%;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .info {
        float: right;
        margin-right: 60px;
        text-align: center;
        p {
          font-size: 60px;
          font-weight: 700;
          font-style: italic;
          color: #fff;
          text-align: center;
          width: 580px;
          line-height: 80px;
          height: 80px;
        }
        p:nth-of-type(1) {
          margin-top: 80px;
        }
        img {
          width: 400px;
          height: 90px;
          margin-top: 90px;
        }
      }
    }
  }
  .empty {
    font-size: 60px;
    color: #fff;
  }



  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
</style>
