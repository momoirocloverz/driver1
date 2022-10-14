import request from './request'
import { format, sub } from 'date-fns'
// =====================================
// Debug
const date = undefined
const auth = {
  app_id: '4473180',
  app_secret: 'STrS3NMifvyaHrQnagrdMCUjGQ5xmgKO'
}

export function getOverviewData(params) {
  return request.post('/gateway/today_data_new', {
    name: params.regionName,
    date: params.date || date
  }, { params: auth })
}

export function getAccuracyData(params) {
  return request.post('/gateway/accuracy_list_new', {
    name: params.regionName,
    date: params.date || date,
    type: params.dateType
  }, { params: auth })
}

export function getWasteTonnageData(params) {
  return request.post('/gateway/refuse_weight_change', {
    name: params.regionName,
    date: params.date || date
  }, { params: auth })
}

export function getDistrictDetails(params) {
  return request.post('/gateway/area_refuse_situation_new', {
    name: params.regionName,
    date: params.date || date
  }, { params: auth })
}

export function getLiveWasteGenerationData(params, times) {
  return request.post('/gateway/today_time_data', {
    name: params.regionName,
    date: params.date || date
  }, { params: auth })
}
export function getWasteGenerationData(params) {
  return request.post('/gateway/today_time_data_new', {
    name: params.regionName,
    start: params.range?.[0],
    end: params.range?.[1],
    type: params.dateType,
  }, { params: auth })
}

export function getRecyclingData(params) {
  return request.post('/gateway/refuse_recovery_situation', {
    name: params.regionName,
    date: params.date || date
  }, { params: auth })
}
export function getFailedSortingData(params) {
  return request.post('/gateway/refuse_recovery_situation_new', {
    name: params.regionName,
    date: params.date || date
  }, { params: auth })
}

export function getSortingData(params) {
  if (!params.live) {
    const currentDate = params.date || format(new Date(), 'yyyy-MM-dd')
    const from = format(sub(new Date(currentDate), { days: 7 }), 'yyyy-MM-dd')
    return request.post('/gateway/unqualified_refuse', {
      name: params.regionName,
      start: from,
      end: currentDate
    }, { params: auth })
  } else {
    return request.post('/gateway/real_time_refuse', {
      name: params.regionName,
      date: params.date || date
    }, { params: auth })
  }
}
