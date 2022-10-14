import request from './requestCopy';
// import { setPathPrefix, UPLOAD_PATH_PREFIX } from '@/utils/constants';

export function phTotalGmv(params) {
  return request({
    url: '/api/gateway/nbapi/test/wsnb/get_pinghu_total_gmv',
    // url: '/api/gateway/get_pinghu_total_gmv',
    method: 'get',
    params,
    headers: { 'API-TOKEN': '4A6E3392EA0B1B1C95CA5768E5DF9EBC' },
  });
}
export function phTotalVolume1(params) {
  return request({
    url: '/api/gateway/nbapi/test/wsnb/get_pinghu_total_volume1',
    // url: '/api/gateway/get_pinghu_total_volume1',
    method: 'get',
    params,
    headers: { 'API-TOKEN': '1605A74ACB4CC285CAB95BBA96B7F5C6' },
  });
}
export function phTotalOrder1(params) {
  return request({
    url: '/api/gateway/nbapi/test/wsnb/get_pinghu_total_order1',
    // url: '/api/gateway/get_pinghu_total_order1',
    method: 'get',
    params,
    headers: { 'API-TOKEN': 'F4897B5CB19528B4FA5B6B229B26ABAE' },
  });
}
export function phTotalBusinessEntity1(params) {
  return request({
    url: '/api/gateway/nbapi/test/wsnb/get_pinghu_business_entity1',
    method: 'get',
    params,
    headers: { 'API-TOKEN': '22D64F0A532FCB4BEC431ED3B01519A7' },
  });
}
export function phTotalTotalGoods1(params) {
  return request({
    url: '/api/gateway/nbapi/test/wsnb/get_pinghu_total_goods1',
    method: 'get',
    params,
    headers: { 'API-TOKEN': '6BD001CD8EB00A259234AE27338EA607' },
  });
}

export function phagPriceVege(params) {
  return request({
    url: '/api/gateway/nbapi/test/wsnb/ph_ag_price_vege',
    method: 'get',
    params,
    headers: { 'API-TOKEN': 'F96CEE148424ABBA2DC08A671DA4104B' },
  });
}

export function phagPriceAqProducts(params) {
  return request({
    url: '/api/gateway/nbapi/test/wsnb/ph_ag_price_aq_products',
    method: 'get',
    params,
    headers: { 'API-TOKEN': 'ADFF736C6E38E7F4AB6F389572555F28' },
  });
}

export function phphOnlineDealUnion(params) {
  return request({
    url: '/api/gateway/nbapi/test/wsnb/ph_online_deal_union',
    method: 'get',
    params,
    headers: { 'API-TOKEN': '720DB1AF051C02D204E6963887D10955' },
  });
}

export function phAppSaleroom(params) {
  return request({
    url: '/api/gateway/nbapi/test/wsnb/ph_app_saleroom',
    method: 'get',
    params,
    headers: { 'API-TOKEN': '6EEF6BAE6AC47E14BE868904E06F3140' },
  });
}

export function phZtSalesRank(params) {
  return request({
    url: '/api/gateway/nbapi/test/wsnb/get_ph_zt_sales_rank',
    method: 'get',
    params,
    headers: { 'API-TOKEN': 'CDF151DA2255FC94B4CC09AF376411E1' },
  });
}

export function phTranList(params) {
  return request({
    url: '/api/gateway/nbapi/test/wsnb/get_pinghu_tran_list',
    method: 'get',
    params,
    headers: { 'API-TOKEN': 'CF593F17D8D117BB1D430AE8431392D9' },
  });
}

export function phNbTranList(params) {
  return request({
    url: '/api/gateway/nbapi/test/wsnb/get_pinghu_nb_tran_list',
    method: 'get',
    params,
    headers: { 'API-TOKEN': 'D4F8D1F3F9F0C50F1474BFBF18023A57' },
  });
}

export function tbTotalMonthOrder(params) {
  return request({
    url: '/api/gateway/nbapi/test/wsnb/tb_total_month_order',
    method: 'get',
    params,
    headers: { 'API-TOKEN': '6FA9B5617347364686A27B3F53EECDCF' },
  });
}

export function tbGoodMonthOrder(params) {
  return request({
    url:
      '/api/gateway/nbapi/test/wsnb/tb_good_month_order?pageNo=1&pageSize=20',
    method: 'get',
    params,
    headers: { 'API-TOKEN': '4752103241AB8453A0A09937290F52DD' },
  });
}
