import request from '@/utils/request';

export const getRolePage = (params: any) => {
  return request({
    url: '/role/page',
    method: 'get',
    params,
  });
};

export const getRoleList = () => {
  return request('/role/list');
};


export const createRole = (data: any) => {
  return request({
    url: '/role',
    method: 'post',
    data,
  });
};


export const getRoleInfo = (id: string) => {
  return request.get(`/role?id=${id}`);
};


export const updateRolePermission = (data: any) => {
  return request.put('/role/permission', data);
};
