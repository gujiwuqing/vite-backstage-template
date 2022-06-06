import request from '@/utils/request';

export const getRolePage = (params: any) => {
  return request({
    url: '/role/page',
    method: 'get',
    params,
  });
};


export const createRole = (data: any) => {
  return request({
    url: '/role',
    method: 'post',
    data,
  });
};
