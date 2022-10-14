import request from './request';
import { api } from './api';
// import { setPathPrefix, UPLOAD_PATH_PREFIX } from '@/utils/constants';

export function login(params) {
  return request.post(api.login, { ...params });
}

export function unbindAccount(params) {
  return request.post(api.unbindAccount, { ...params });
}

export function adminList(params) {
  return request.post(api.adminList, { ...params })
}

export function updateAdminInfo(params) {
  return request.post(api.updateAdminInfo, { ...params })
}

export function addUser(params) {
  return request.post(api.addUser, { ...params })
}

export function deleteUser(params) {
  return request.post(api.deleteUser, { ...params })
}

export function editUser(params) {
  return request.post(api.editUser, { ...params })
}

export function createOpenTicket(params) {
  return request.post(api.createOpenTicket, { ...params })
}