import request from './request';
import { api } from './api';

// 平湖农村宜居宜业大屏--三大革命
export function livableProfessionalRevolution(params) {
  return request.post('/gateway/pinghu_livable_professional_revolution', {
    ...params,
  });
}

// 平湖农村宜居宜业大屏--全域秀美
export function livableProfessionalUniverseInspection(params) {
  return request.post(
    '/gateway/pinghu_livable_professional_universe_inspection',
    { ...params },
  );
}

// 平湖农村宜居宜业大屏--美丽经济
export function livableProfessionalBeautifulEconomy(params) {
  return request.post(
    '/gateway/pinghu_livable_professional_beautiful_economy',
    { ...params },
  );
}

// 平湖农村宜居宜业大屏--人均可支配收入
export function livableProfessionalPerIncome(params) {
  return request.post('/gateway/pinghu_livable_professional_per_income', {
    ...params,
  });
}

export function livableProfessionalIntegral(data) {
  return request.post('/gateway/pinghu_livable_professional_integral', data);
}

export function livableProfessionalInteFamily(data) {
    return request.post('/gateway/pinghu_livable_professional_integral_family', data);
  }