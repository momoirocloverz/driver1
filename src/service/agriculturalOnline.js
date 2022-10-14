import request from './requestReboot';
// import { setPathPrefix, UPLOAD_PATH_PREFIX } from '@/utils/constants';
// let url = 'https://dev-pinghu-jsc-apiweb.hzanchu.com';
let url = 'http://mapapi.wsnf.cn';
if (process.env.NODE_ENV == 'production') {
  url = 'http://mapapi.wsnf.cn';
}
// console.log('process', process);
export function storeList(data) {
  return request({
    url: `${url}/api/store/list`,
    method: 'post',
    data,
  });
}

export function orderList(data) {
  return request({
    url: `${url}/api/store/order_list`,
    method: 'post',
    data,
  });
}

export function dateAmountList(data) {
  return request({
    url: `${url}/api/store/date_amount_list`,
    method: 'post',
    data,
  });
}

export function dispatchTargetProportion(data) {
  return request({
    url: `${url}/api/store/dispatch_target_proportion`,
    method: 'post',
    data: {
      version: '1.0.0',
      app_id: '3585148',
      app_secret: 'GHTfEjW37YrPVWbSXWTCi96BmzWMmfTR',
    },
  });
}
