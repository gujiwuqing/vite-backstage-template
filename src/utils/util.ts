import dayjs from 'dayjs';

export const formatDate=(value:string)=>{
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
}
