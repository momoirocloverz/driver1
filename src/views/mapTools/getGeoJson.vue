<template>
  <div class="outer">
    <div id="main">
      <div id="img"><img src="https://img.hzanchu.com/acimg/45126c91ee65ca1d8d67407a0eb41562.png" alt=""></div>
      <div id="container"></div>
    </div>
    <div id="text">
      <input id="startBtn" type="button" @click="startTool()" value="开启取点"/>
      <input type="button" @click="clear()" value="清除"/>
      <input type="button" @click="edit()" value="开启编辑"> 
      <input type="button" @click="closeDrag()" value="关闭拖拽">
    </div>

    <div id="info">坐标：</div>
  </div>
</template>

<script>
export default {
  name: 'getGeoJson',
  data() {
    return {
      map: '',
      key: 1,
      newpoint: '',
      points: [],
      polyline: ''
    }
  },
  mounted() {
    let that = this
    this.map = new BMap.Map("container", {enableMapClick: false});
    var map = this.map
    map.centerAndZoom(new BMap.Point(119.685213,29.690046), 14);
    // map.enableScrollWheelZoom();
    // 
    var cr = new BMap.CopyrightControl({anchor: BMAP_ANCHOR_TOP_RIGHT});
    map.addControl(cr); //添加版权控件
    var bs = map.getBounds();   //返回地图可视区域
    cr.addCopyright({
        id: 1,
        content: "<div style='font-size:12px;margin: 10px;padding:5px;background: rgba(255,255,255,.8);'>Copyright © 漏刻有时百度地图API开发</div>",
        bounds: bs
    });
    this.polyline = new BMap.Polyline([],{
      strokeColor:"black", strokeWeight:1, strokeOpacity:0.8
    }); //折线覆盖物

    this.map.addEventListener("click", function (e) {
      console.log(e, 'e')
      that.newpoint = new BMap.Point(e.point.lng, e.point.lat);
      console.log(that.key, 'key')
      if (that.key == 0) {
        //    if(points[points.length].lng==points[points.length-1].lng){alert(111);}
        that.points.push(that.newpoint);  //将新增的点放到数组中
        that.polyline.setPath(that.points);   //设置折线的点数组
        that.map.addOverlay(that.polyline);   //将折线添加到地图上
        /*02.数据集格式*/
        document.getElementById("info").innerHTML += "[" + e.point.lng + "," + e.point.lat + "],";
      }
    });

    this.map.addEventListener("dblclick", function (e) {
        if (that.key == 0) {
            that.map.disableDoubleClickZoom();   //关闭双击放大
            var polygon = new BMap.Polygon(that.points);
            that.map.addOverlay(polygon);   //将折线添加到地图上
        }
    });
  },
  methods: {
    startTool() {
      if (this.key == 1) {
        document.getElementById("startBtn").style.background = "green";
        document.getElementById("startBtn").style.color = "white";
        document.getElementById("startBtn").value = "开启取点";
        this.key = 0;
      }
      else {
        document.getElementById("startBtn").style.background = "red";
        document.getElementById("startBtn").value = "关闭取点";
        this.key = 1;
      }
    },
    clear() {
      this.map.clearOverlays();
      document.getElementById('info').innerHTML = '';
      this.points=[];
    },
    edit() {
      this.polyline.enableEditing();
    },
    closeDrag() {
      this.map.disableDragging()
    }
  }
}
</script>

<style lang="scss" scoped>
  .outer {
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: "微软雅黑";
  }
  #main {
      position: relative;
  }

  #img {
      position: absolute;
      width: 1600px;
      opacity: 0.8;
      left: 1080px;
      top: 200px;
      z-index: -999;
      background: #ccc;
      img {
        width: 100%;
      }
  }

  #container {
      width: 100%;
      height: 80vh;
      border: 1px solid gray;
      position: absolute;
      opacity: 0.5;
      z-index: 9999;
  }

  #text {
      position: absolute;
      z-index: 9999;
      left: 50px;
      bottom: 320px;
  }

  #info {
      position: absolute;
      z-index: 999999;
      left: 50px;
      bottom: 220px;
  }
</style>
