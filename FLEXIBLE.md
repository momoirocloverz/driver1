# vue-cli3.0结合lib-flexible、px2rem实现pc端大屏适配

## 安装lib-flexible

```bash
npm install lib-flexible --save

# 在项目的入口main.js文件中引入lib-flexible
import 'lib-flexible' // 默认将屏幕划分为10等分 （如果设计稿尺寸为1920px, 则 1rem = (1920/10)px;偏大，可以设置24等分，则1rem = (1920/24)px=80px;
```

## 使用postcss-px2rem-exclude自动将css中的px转换成rem

```bash
npm install postcss-px2rem-exclude --save

# 配置项

# 如果项目生成了postcss.config.js文件，则在该文件下增加

module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px2rem-exclude": {
      remUnit: 75,
      exclude: /node_modules|folder_name/i
    }
  }
}

# 如果没有，则在package.json文件下增加

"postcss": {
  "plugins": {
    "autoprefixer": {},
    "postcss-px2rem-exclude":{
        "remUnit": 75,  // 750px / 10
        "exclude":"/node_modules|floder_name/i"
    }
  }
}

# 同时如果适配大屏的话需要修改node_modules下面的lib-flexible/flexible.js文件

function refreshRem(){
  var width = docEl.getBoundingClientRect().width;
  if (width / dpr > 540) {
      width = width * dpr;  // 当屏幕宽度超过540的时候我们应该以实际宽度重新计算,从而来做到适应PC
  }
  var rem = width / 10;
  docEl.style.fontSize = rem + 'px';
  flexible.rem = win.rem = rem;
}
```

