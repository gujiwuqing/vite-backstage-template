import request from '@/utils/request';

export const getLoggerPage = (params: any) => {
  return request({
    url: '/logger/page',
    method: 'get',
    params,
  });
};

