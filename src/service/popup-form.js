import request from './request'
import axios from "axios";
// =====================================
const baseUrl = 'http://jsc.wsnf.cn';
const auth = {
  app_id: '4473180',
  app_secret: 'STrS3NMifvyaHrQnagrdMCUjGQ5xmgKO'
}

// 平湖驾驶舱表结构展示接口--一级分类详情列表
export function pinghuStatusList(params) {
  return request.post('/gateway/pinghu_status_list', params, {params: auth})
}

// 平湖驾驶舱表结构展示接口--一级分类详情列表
export function pinghuStatusLowerList(params) {
  return request.post('/gateway/pinghu_status_lower_list', params, {params: auth})
}

// 平湖驾驶舱表结构展示接口--一级分类详情列表
export function pinghuStatusTableList(params) {
  return request.post('/gateway/pinghu_status_table_list', params, {params: auth})
}
