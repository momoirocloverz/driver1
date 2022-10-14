import request from './request'
// =====================================
const auth = {
  app_id: '4473180',
  app_secret: 'STrS3NMifvyaHrQnagrdMCUjGQ5xmgKO'
}

export function getOverviewData(params) {
  return request.post('/gateway/znb_claim_statistics_new', params, { params: auth })
}
export function getSubsidyCategories() {
  return request.post('/gateway/znb_scale_plant', {}, { params: auth })
}

export function getProgressData(params) {
  return request.post('/gateway/znb_declares_data_statistics_list', params, { params: auth })
}

export function getProgressDetails(params) {
  return request.post('/gateway/znb_declares_statistics_info', params, { params: auth })
}
