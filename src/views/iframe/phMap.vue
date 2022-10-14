<template>
  <div style="margin:0 auto;width: 100%;height: 100%; background-color: transparent;border:rgba(255,255,255,0);">
    <div id="infoWindow" class="pop" :class="popType" v-show="!(selectName === 'YXLQWYZTJG' || selectName === '')">
      <img src="https://img.hzanchu.com/acimg/89101aac85bd6bfdb88d0583e06540a7.png" alt="" />
      <div>
        <p v-if="selectName === 'YZDMCYBJT' && popType == 'point'">{{company}}</p>
        <p v-else>{{industrial[selectName]}}</p>
      </div>
    </div>
    <div class="select">
      <div class="select-input">
        <span>平湖农业农村十四五规划</span>
        <div @click="isShow = !isShow" :class="{ active: isShow }"></div>
      </div>
      <div class="drop-down" v-if="isShow">
        <div>
          <div class="select-item" v-for="(item, index) in layers" :key="index">
            <input type="checkbox" v-model="item.isSelect" @click="selectLayer(item)">
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="legend" :class="selectName"  v-show="!(selectName === 'YXLQWYZTJG' || selectName === '')">
      <div class="legend-item" v-for="(item,index) in legend" :key="index">
        <img :src= "item.imgUrl" >
        <span>{{item.name}}</span>
      </div>
    </div>
    <div id="map" style="margin:0 au-to;width: 100%;height: 100%; background-color: transparent;border:rgba(255,255,255,0);"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isShow: false,  // 图层选择下框显隐值
        industrial:{
          'LSSCCY': '绿色蔬菜产业重点布局在新埭镇西部的大齐塘、牌楼和东部的兴旺、鱼圻塘、星光，广陈镇东部的龙萌、山塘、泗泾、港中、三兴，新仓镇南部的三叉口、石路、友联和东部的双红、杉青港，独山港镇北部的赵家桥、周家圩、韩家庙、建中、前进等地。',
          'JPGGCY': '精品瓜果产业重点布局在广陈镇东部的龙萌、泗泾、三兴，新仓镇南部的友联、三叉河和东部的芦湾、双红、杉青港，独山港镇北部的韩家庙，曹桥街道西部的九里亭、野马、孔家堰、马厩，新埭镇东部的星光、鱼圻塘、泖河、兴旺和西部的牌楼、旧埭，林埭镇北部的徐家埭，钟埭街道北部的沈家弄、钟埭，当湖街道南部的金家等地。',
          'GDHHCY': '高端花卉产业重点布局在新埭镇西部的旧埭，独山港镇北部的韩家庙，新仓镇北部的杉青港等地。',
          'TSJGCY': '特色菌菇产业重点布局在曹桥街道南部的百寿、马厩，当湖街道西部的黄家浜，新仓镇东部的杉青港、中华、双红等地。',
          'STYZCY':'生猪养殖重点布局在新埭镇的旧埭、独山港镇的金沙、小营头;实验小白鼠养殖重点布局在钟埭街道，蜜蜂重点布局在独山港镇的周家圩;水产养殖重点布局在林埭镇北部的双庙、华丰、祥中和东部的徐东，新仓镇北部的中华、秦沙和南部的友联，独山港镇北部的赵家桥、韩家庙，新埭镇东部的鱼圻塘和西部的旧埭、大齐塘，广陈镇南部的三兴等地。',
          'NCPJSJGCY':'农产品精深加工业重点布局在钟埭街道永兴社区，林埭镇的华丰，广陈镇的港中，新埭镇的兴旺，新仓镇的三叉河村等地。',
          'NLRHCY':'农旅融合产业重点布局在当湖街道的金家、虹霓，曹桥街道的马厩、野马，钟埭街道的钟埭、沈家弄、大力，新仓镇的杉青港、三叉河、石路、中华，新埭镇的泖河、兴旺、旧埭、鱼折塘，林埭镇的徐家埭、祥中、徐东、共和、陈匠，广陈镇的山塘、龙萌，独山港镇的赵家桥、优胜、海塘等地。',
          'XDZYCY':'现代种业重点布局在广陈镇的龙萌、泗泾，曹桥街道的九里亭，新埭镇的旧埭、鱼圻塘，独山港镇的韩家庙、聚福等地。',
          'XDNYFUCY':'现代农业服务业重点布局在广陈镇的龙萌、港中、泗泾，林埭镇的徐家埭，新埭镇的鱼折塘，新仓镇的友联，独山港镇的韩家庙等地。',
          'YZDMCYBJT':'优质稻米产业重点布局在粮食生产功能区，主要有当湖街道的黄家浜，曹桥街道南部的孔家堰、严家门、马厩、野马、百寿，广陈镇南部的龙兴、三红和东部的山塘、三兴、泗泾，新仓镇南部的友联和北部的中华、秦沙及东部的杉青港、芦湾，新埭镇东部的星光、鱼圻塘和西部的牌楼、大齐塘，林埭镇北部的祥中、华丰、徐东和南部的新庄、共和、陈匠、群丰，独山港镇北部的周家圩、赵家桥、韩家庙，乍浦的八字、长安桥等地。'
        },
        popType:'',  // 弹窗的类型：企业名称/介绍
        company:"企业名称", //弹窗内容：企业名称
        layers:[{isSelect: true,id: "YXLQWYZTJG",name: "一心两区五园总体架构"},{isSelect: false,id: "STYZCY",name: "生态养殖产业"},{isSelect: false,id: "LSSCCY",name: "绿色蔬菜产业"},{isSelect: false,id: "JPGGCY",name: "精品瓜果产业"},{isSelect: false,id: "GDHHCY",name: "高端花卉产业"},{isSelect: false,id: "TSJGCY",name: "特色菌菇产业"},{isSelect: false,id: "NCPJSJGCY",name: "农产品精深加工产业"},{isSelect: false,id: "NLRHCY",name: "农旅融合产业"},{isSelect: false,id: "XDZYCY",name: "现代种业产业"},{isSelect: false,id: "XDNYFUCY",name: "现代农业服务产业"},{isSelect: false,id: "YZDMCYBJT",name: "优质稻米产业布局图"}],
        selectName:'YXLQWYZTJG',
        legend:[{id: '',name: '',imgUrl: ""}],
        legendData:{'STYZCY':[{name:'生猪养殖产业',imgUrl:'https://img.hzanchu.com/acimg/54cdcc7a11c755d133bc4bf07dae07dd.png'},{name:'实验小白鼠养殖产业',imgUrl:'https://img.hzanchu.com/acimg/19f17b460a14af973ae9400c0a8ef5d3.png'},{name:'蜜蜂养殖产业',imgUrl:'https://img.hzanchu.com/acimg/cdc60d09f65e1d2ec64a1049357bd9af.png'},{name:'水产养殖产业',imgUrl:'https://img.hzanchu.com/acimg/15f79a4c5bb97af2793ff7a506197173.png'}],'LSSCCY':[{name:'绿色蔬菜产业区',imgUrl:'https://img.hzanchu.com/acimg/a6ce71b47c446332ee7c3f0026eecccc.png'}],'JPGGCY':[{name:'精品瓜果产业区',imgUrl:'https://img.hzanchu.com/acimg/db4702b964c93df935fdd8c7ffe05c18.png'}],
        'GDHHCY':[{name:'高端花卉产业区',imgUrl:'https://img.hzanchu.com/acimg/8d0f8bdb0519fcd9102f9b25fa57af34.png'}],'TSJGCY':[{name:'特色菌菇产业区',imgUrl:'https://img.hzanchu.com/acimg/60e5464a6f4fe82adc72ac7cbc00caee.png'}],'NCPJSJGCY':[{name:'农产品精深加工产业',imgUrl:'https://img.hzanchu.com/acimg/d194c34b3cda1d6f11038a15ec1f21a1.png'}],'NLRHCY':[{name:'农旅融合产业',imgUrl:'https://img.hzanchu.com/acimg/b7fd9249f7581b00d7ae39d36898c6b2.png'}],'XDZYCY':[{name:'现代种业产业',imgUrl:'https://img.hzanchu.com/acimg/3ba19c31e6cecba42895fc621ce4b3ca.png'}],'XDNYFUCY':[{name:'现代农业服务产业',imgUrl:'https://img.hzanchu.com/acimg/af763b43a1ffda84bd3aa6c99fea7a8f.png'}],'YZDMCYBJT':[{name:'平湖市育秧中心',imgUrl:'https://img.hzanchu.com/acimg/10b69cbc8e93384ea84944b640adbe20.png'},{name:'平湖市烘干中心',imgUrl:'https://img.hzanchu.com/acimg/38d5d11b54a04728ff57a86256e33ed7.png'}]},
        acMap: null,
        vector_label: null,
        vector_feature: null,
        image_YXLQWYZTJG: null,
        overLayer: null,
        DIYNames: ["YZDMCYBJT","WYBJT"],
        fillColorObj: {"GDHHCY": "rgba(248, 92, 48, 0.4)","JPGGCY": "rgba(31, 209, 255, 0.4)","LSSCCY": "rgba(74, 235, 74, 0.4)","TSJGCY": "rgba(248, 197, 56, 0.4)","STYZCY": "rgba(0, 255, 165, 0.4)"},
        strokeColorObj: {"GDHHCY": "rgba(248, 92, 48, 1)","JPGGCY": "rgba(31, 209, 255, 1)","LSSCCY": "rgba(74, 235, 74, 1)","TSJGCY": "rgba(248, 197, 56, 1)","STYZCY": "rgba(0, 255, 165, 1)"},
        lineDashObj: {"GDHHCY": [5,10,20,10],"JPGGCY": [5,10,30,10],"LSSCCY": [5,10,30,10],"TSJGCY": [5,10,20,10],"STYZCY": [5,10,30,10]},
        anchorObj: {"STYZCY": [0.5,0.67],"YZDMCYBJT": [0.5,1]},
        geoJsonData_town: null,
        geoJsonData_county: null
      }
    },
    mounted(){
    	this.$nextTick(() => {
        // 初始化
        this.init();
    	})
    },
    methods: {
      /**
       * 初始化方法
       */
      init(){
        let thiz = this;

        // 压缩数据解密
        this.geoJsonData_town = new acol_dea().decodeGeoJson({data:geoJsonData_town1});
        this.geoJsonData_county = new acol_dea().decodeGeoJson({data:geoJsonData_county1});

        // acMap对象
        this.acMap = new acol_map();
        this.acMap.initMap({id:"map",center:[121.108325569296,30.7161906685102],zoom:12,minZoom:11,maxZoom:13,constrainResolution:false});

        // 矢量偏移
        let res_data = new acol_util().geoJsonTransformTranslate({data:this.geoJsonData_county,distance:0.5,direction:180});
        let diff_data = new acol_util().differenceByTurf(res_data,this.geoJsonData_county);

        // 加载初始化图层信息
        this.acMap.addLayersByOptions([
        	{layer:"imageLayer",name:"img_back",imageUrl:require("../../assets/image/jiashicang/Image.png"),extent:[120.94620606918487,30.573033364623374,121.27044506940672,30.859347972396961],zIndex:0},
        	{layer:"imageLayer",name:"img_YXLQWYZTJG",imageUrl:require("../../assets/image/jiashicang/YXLQWYZTJG.png"),extent:[120.959800557933,30.587097284141279,121.271360958213,30.879994046664031],zIndex:2},
        	{layer:"vectorLayer",name: "vec_back",type: "polygon",dataOption:{data:diff_data},style:{fill:{"color":"rgba(3,166,197,0.5)"},stroke:{"color":"rgba(3,166,197,1)","width":2}},zIndex:0},
        	{layer:"vectorLayer",name: "vec_area",type: "polygon",dataOption:{data:this.geoJsonData_town},style:{fill:{"color":"rgba(0,191,255,0.2)"},stroke:{"color":"rgba(107,188,250,1)","width":1}},zIndex:1},
        	{layer:"vectorLayer",name: "vec_label",type: "polygon",dataOption:{data:this.geoJsonData_town},style:{fill:{},stroke:{},text:{field:"name",font: "16px Calibri",stroke:{},backgroundStroke: {color:'rgba(0,191,255,1)',width:2},backgroundFill: {color:'rgba(0,191,255,0.5)'},padding: [4,2,2,4],}},visible:false,zIndex:1},
        	{layer:"vectorLayer",name:"vec_feature",zIndex:2}
        ],function({name,layer}){
            switch(name){
              case "img_YXLQWYZTJG":
                thiz.image_YXLQWYZTJG = layer;
                break;
              case "vec_label":
                thiz.vector_label = layer;
                break;
              case "vec_area":
                // 定位
                new acol_layer(thiz.acMap.map).panToByExtent({
                  extent: new acol_util().extentZoomByNum({extent:layer.getSource().getExtent(),zoomNum:0.01}),
                  zoomNum: 0.01,duration: 1000,
                });
                break;
              case "vec_feature":
                thiz.vector_feature = layer;
                // 设置样式
                thiz.vector_feature.setStyle(function(feature){
                  let geometryType = feature.getGeometry().getType();
                  let temp_style = new ol.style.Style({
                    image: (geometryType === "Point") ? new ol.style.Icon({
                      src: require("../../assets/image/jiashicang/"+(feature.get("icon") || feature.get("type"))+".png"),
                      anchor: thiz.anchorObj[feature.get("type")] || [0.5,0.5],
                      scale: 1
                    }) : null,
                    fill: (geometryType === "Polygon") ? new ol.style.Fill({
                      color: thiz.fillColorObj[feature.get("type")]
                    }) : null,
                    stroke: (geometryType === "Polygon") ? new ol.style.Stroke({
                      color: thiz.strokeColorObj[feature.get("type")],
                      width: 6,
                      lineCap: "square",
                      lineDash: thiz.lineDashObj[feature.get("type")]
                    }) : null,
                  });
                  return temp_style;
                });
                break;
              default:
                return;
            }
          }
        );

        // 添加气泡叠加层
        this.addPopupByElement(document.getElementById("infoWindow"));

        // 注册鼠标单击事件
        this.acMap.mapEventOn(function(e){
          // 屏幕坐标点获取要素
          let features = thiz.acMap.map.getFeaturesAtPixel(e.pixel);
          if(features.length){
            if(thiz.DIYNames.indexOf(features[0].getProperties()["type"]) != -1){
              thiz.popType = 'point';
              thiz.company = features[0].getProperties()["name"];
              thiz.overLayer.setOffset([10,-60])
            }else{
              thiz.popType = '';
              thiz.overLayer.setOffset([10,-140])
            }
            // 弹窗
            thiz.overLayer.setPosition(e.coordinate);
          }else{
            thiz.overLayer.setPosition(undefined);
          }
        },"MOUSE_MOVE");
      },
      // 叠加层绑定Element
      addPopupByElement(element){
        if(new acol_layer(this.acMap.map).getOverlayById("infoWindow")) new acol_layer(this.acMap.map).removeOverlayById("infoWindow");
        // 添加overLayer图层
        this.overLayer = new acol_layer(this.acMap.map).overLayer({id:"infoWindow",element:element,offset:[10,-90],positioning:"top-left",autoPan:false});
        this.acMap.map.addOverlay(this.overLayer);
      },
      /**
       * 通过名称添加要素
       * @param {String} name
       */
      addFeaturesByName(name){
      	// 清空要素
      	this.vector_feature.getSource().clear();

        if(name == "") return;
      	// 遍历
      	for(let i=0;i<eval("geoJsonData_"+name).length;++i){
      		// 添加geoJson格式数据
      		let features = new ol.format.GeoJSON().readFeatures(eval("geoJsonData_"+name)[i], {
      			featureProjection: 'EPSG:4326',
      		});
      		this.vector_feature.getSource().addFeatures(features);
      	}
      },
      /**
       * 下拉框(复选框)
       * @param {Object} item
       */
      selectLayer(item) {
        this.clearAll(item.id)
        item.isSelect = !item.isSelect;
        item.isSelect == true ? this.selectName = item.id : this.selectName = '';
        this.legend = this.legendData[item.id];

        if(this.selectName === "YXLQWYZTJG"){
        	this.vector_feature.getSource().clear();
        	this.vector_label.setVisible(false);
        	// 隐藏
        	this.image_YXLQWYZTJG.setVisible(true);
        }else{
        	this.image_YXLQWYZTJG.setVisible(false);
        	this.vector_label.setVisible(true);
        	// 添加要素
        	this.addFeaturesByName(this.selectName);
        }

      },
      clearAll(name) {
        this.layers.map(item => {
          if (item.id !== name) item.isSelect = false
        })
      }
    }
  }
</script>

<style lang="scss" scope>
  body {
    background-color: transparent;
    border:rgba(255,255,255,0);
  }
  /* 临时解决openlayers叠加层层级问题 */
  .ol-overlaycontainer, .ol-overlaycontainer-stopevent{
  	z-index: 99999!important;
  }
  
  .pop {
    display: flex;
    /* position: absolute; */
    align-items: center;
    z-index: 999;
  img {
    width: 87px;
    height: 50px;
  }
  div {
    display: flex;
    align-items: center;
    background: url('https://img.hzanchu.com/acimg/035e0f23b60bb95323a31c17d2b97d12.png');
    background-size: 100% 100%;
    max-width: 380px;
    height: 232px;
    background-repeat: no-repeat;
    padding: 26px;
  }

  p {
    font-size: 14px;
    line-height: 20px;
    color: #FFFFFF;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

  .point {
   div {
     height: 76px;
   }
  }

.select {
  width: 216px;
  height: calc(40px + 160px);
  display: flex;
  flex-direction: column;
  left: 2%;
  top: 2%;
  position: absolute;
  z-index: 99999;
  .select-input {
    height: 40px;
    border: 1px solid #4993F8;
    background-color: rgba(73, 147, 248, 0.16);
    border-radius: 2px;
    display: flex;
    // gap: 24px;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    span {
      font-size: 16px;
      margin-right: 10px;
    }
    .active{
      transform: rotate(135deg);
      margin-top: 6px;
    }
    div {
      transition: transform .5s;
      transform: rotate(-45deg);
      cursor: pointer;
      margin-left: 8px;
      margin-bottom: 4px;

      &::after{
        content: "";
        height: 10px;
        width: 10px;
        display: block;
        border-left: 2px solid;
        border-bottom: 2px solid;
      }
    }
  }

  .drop-down {
    background-color: rgba(73, 147, 248, 0.16);
    border-radius: 2px;
    & > div {
      height: 128px;
      margin: 16px auto;
      padding: 0 18px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }

    .select-item {
      display: flex;
      gap: 10px;
    }

    input {
      visibility: hidden;
      width: 16px;
      height: 16px;

      &::before{
        content: '';
        display: inline-block;
        width: 16px;
        height: 16px;
        visibility: visible;
        border: 2px solid #FFFFFF;
        cursor: pointer;
      }

      &:checked::before {
        content: '\2714';
        color: #FFFFFF;
        text-align: center;
      }
    }

    span {
      color: #FFFFFF;
    }
  }
}
.legend {
  background: url("https://img.hzanchu.com/acimg/e8bd207e8d6b1251c59531725b3a1482.png");
  background-size: 100% 100%;
  width: 220px;
  display: flex;
  flex-direction: column;
  bottom: 2%;
  right: 2%;
  position: absolute;
  z-index: 999;
  gap: 8px;
  padding: 20px 16px;

  .legend-item {
    display: flex;
    gap: 14px;
    align-items: center;

    img {
      height: 32px;
      object-fit: contain;
    }

    span {
      font-size: 14px;
      line-height: 24px;
      color: #FFFFFF;
      // color: black;
    }
  }


}

</style>
