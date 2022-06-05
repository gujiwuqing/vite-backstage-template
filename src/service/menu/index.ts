import request from '@/utils/request';

export const getMenuPage = (params: any) => {
  return request({
    url: '/menu/page',
    method: 'get',
    params,
  });
};


export const createMenu = (data: any) => {
  return request({
    url: '/menu',
    method: 'post',
    data,
  });
};
