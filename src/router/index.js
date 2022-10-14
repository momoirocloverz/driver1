import Vue from 'vue';
import Router from 'vue-router';
import { Message } from 'element-ui';
Vue.use(Router);

/* Layout */
import Layout from '@/layout';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // 数字中心系统架构
  {
    path: '/dataCenter',
    component: () => import('@/views/dataCenter/index'),
    hidden: true,
    meta: { title: '平湖市数字乡村大数据平台' },
  },
  {
    path: '/liveable',
    component: () => import('@/views/liveable/index'),
    hidden: true,
    meta: { title: '平湖市数字乡村大数据平台' },
  },
  {
    path: '/recordsCenter',
    component: () => import('@/views/recordsCenter/index'),
    hidden: true,
    meta: { title: '数字驾驶舱' },
  },
  {
    path: '/cockpit',
    component: () => import('@/views/cockpit/index'),
    hidden: true,
    meta: { title: '数字驾驶舱' },
  },
  {
    path: '/newCockpit',
    component: () => import('@/views/newCockpit/index'),
    hidden: true,
    meta: { title: '数字驾驶舱' },
  },
  {
    path: '/cockpit/detail',
    component: () => import('@/views/cockpit/detail'),
    hidden: true,
    meta: { title: '数字驾驶舱' },
  },
  {
    path: '/AppCenter',
    component: () => import('@/views/AppCenter/index'),
    hidden: true,
    meta: { title: '数字应用中心' },
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: { title: '登录' },
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },
  {
    path: '/pingHuMap',
    component: () => import('@/views/iframe/pingHuMap'),
    hidden: true,
    meta: { title: '平湖市数字乡村大数据中心' },
  },
  {
    path: '/index',
    component: () => import('@/views/iframe/index'),
    hidden: true,
    meta: { title: '数字乡村大数据中心' },
  },
  {
    path: '/experience',
    component: () => import('@/views/iframe/experience'),
    hidden: true,
    meta: { title: '平湖市数字乡村大数据中心' },
  },
  {
    path: '/frames/agri-map',
    component: () => import('@/views/iframe/agriMap'),
    hidden: true,
    meta: { title: '平湖市数字乡村大数据中心' },
  },
  {
    path: '/dataAssets',
    component: () => import('@/views/dataAssets/index'),
    hidden: true,
    meta: { title: '数据资产' },
  },
  {
    path: '/baiduMap',
    component: () => import('@/views/mapTools/baiduMap'),
    hidden: true,
    meta: { title: '地图工具' },
  },
  {
    path: '/getGeoJson',
    component: () => import('@/views/mapTools/getGeoJson'),
    hidden: true,
    meta: { title: '地图工具' },
  },
  {
    path: '/pingHuH5',
    component: () => import('@/views/iframe/pingHuH5'),
    hidden: true,
    meta: { title: '网上农博·平湖馆' },
  },
  {
    path: '/userManage',
    component: () => import('@/views/userManage/index'),
    hidden: true,
    meta: { title: '用户管理' },
  },
  {
    path: '/cockpit/xcsz',
    component: () => import('@/views/cockpit/xcsz'),
    hidden: true,
    meta: { title: '乡村善治' },
  },
  {
    path: '/cockpit/waste-management',
    component: () => import('@/views/cockpit/waste-management'),
    hidden: true,
    meta: { title: '垃圾分类数字化' },
  },
  {
    path: '/iframe/popup-form',
    component: () => import('@/views/iframe/popupForm'),
    hidden: true,
    meta: { title: '弹出表格' },
  },
  {
    path: '/cockpit/agriculture-subsidies',
    component: () => import('@/views/cockpit/subsidies'),
    hidden: true,
    meta: { title: '浙农补' },
  },
  // 后台架构
  {
    path: '/',
    component: Layout,
    redirect: '/dataCenter',
    meta: { title: '数据驾驶舱', icon: 'nested' },
    name: '数据驾驶舱',
    children: [
      {
        path: 'scene1',
        name: 'scene1',
        component: () => import('@/views/cockpit/scene1'),
        meta: { title: '食用菌全产业链数据看板' },
      },
      {
        path: 'scene2',
        name: 'scene2',
        component: () => import('@/views/cockpit/scene2'),
        meta: { title: '芦笋全产业链数据看板' },
      },
      {
        path: 'scene3',
        name: 'scene3',
        component: () => import('@/views/cockpit/scene3'),
        meta: { title: '农机数字化展示' },
      },
      {
        path: 'scene4',
        name: 'scene4',
        component: () => import('@/views/cockpit/scene4'),
        meta: { title: '农业面源污染治理' },
      },
      {
        path: 'scene5',
        name: 'scene5',
        component: () => import('@/views/cockpit/scene5'),
        meta: { title: '农开区数字化展示' },
      },
      {
        path: 'scene6',
        name: 'scene6',
        component: () => import('@/views/cockpit/scene6'),
        meta: { title: '农业资源一张图' },
      },
      {
        path: 'scene7',
        name: 'scene7',
        component: () => import('@/views/cockpit/scene7'),
        meta: { title: '农产品线上交易情况' },
      },
    ],
  },
  // 平湖农村宜居宜业
  {
    path: '/liveable/index',
    name: '平湖农村宜居宜业',
    component: () => import('@/views/liveable/index'),
    meta: {
      title: '平湖农村宜居宜业',
    },
  },
  {
    path: '/fenghua/data',
    name: '奉化区数字乡村平台',
    component: () => import('@/views/fenghua/index'),
    meta: {
      title: '奉化区数字乡村平台',
    },
  },
  {
    path: '/fenghua/data/page',
    component: () => import('@/views/fenghua/iframe'),
    hidden: true,
    meta: { title: '' },
  },
  {
    path: '/fenghua/cockpit',
    name: '奉化数字乡村驾驶舱',
    component: () => import('@/views/fenghua/cockpit'),
    meta: {
      title: '奉化数字乡村驾驶舱',
    },
  },
  {
    path: '/iframe/phMap',
    name: '平湖驾驶舱地图',
    component: () => import('@/views/iframe/phMap'),
    meta: {
      title: '平湖驾驶舱地图',
    },
  },
  {
    path: '/theRichRicher',
    name: '平湖数字乡村驾驶舱',
    component: () => import('@/views/cockpit/theRichRicher'),
    meta: {
      title: '平湖数字乡村驾驶舱',
    },
  },
  {
    path: '/phdm',
    name: 'phdm',
    component: () => import('@/views/phdm-demo'),
    meta: {
      title: '平湖水稻产业大脑',
    },
  },
  {
    path: '/phdm/circulate',
    name: 'phRiceTrans',
    component: () => import('@/views/phdm-demo/circulate'),
    meta: {
      title: '平湖稻米流通',
    },
  },
  {
    path: '/phdm/production',
    name: 'phProduction',
    component: () => import('@/views/phdm-demo/production'),
    meta: {
      title: '生产端分析',
    },
  },
  {
    path: '/phdm/warning',
    name: 'phWarning',
    component: () => import('@/views/phdm-demo/warning'),
    meta: {
      title: '病虫害预警',
    },
  },
  {
    path: '/phdm/regulatory',
    name: 'phRegulatory',
    component: () => import('@/views/phdm-demo/regulatory'),
    meta: {
      title: '质量监管',
    },
  },
  {
    path: '/phOnlineTradingOfAgricultural',
    name: 'phOnlineTradingOfAgricultural',
    component: () => import('@/views/phOnlineTradingAgricultural/index'),
    meta: {
      title: '农产品线上交易',
    },
  },
  {
    path: '/fenghua/rice',
    name: '奉化粮食',
    component: () => import('@/views/fenghua/rice/index.vue'),
    meta: {
      title: '奉化粮食'
    }
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    mode: 'history',
    routes: constantRoutes,
  });

const router = createRouter();

router.afterEach((to, from) => {
  console.log(to, 'to');
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (!localStorage.getItem('token')) {
    console.log(localStorage.getItem('token'), 'token');
    if (to.path === '/newcockpit') {
      Message.warning('请重新登录');
      router.push('/recordsCenter');
    }
  }
});

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
