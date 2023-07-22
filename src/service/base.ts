export interface BaseListDTO<T> {
  list: T[];
  page: number;
  pageSize: number;
  total: number;
}

export interface PageVO {
  pageNo: number;
  pageSize: number;
}

export interface MenusItemDTO {
  label: string;
  icon: string;
  key: string;
  title?: string;
  id?: string;
  sort?: number;
  children?: MenusItemDTO[];
}

export type UserInfo = {
  email: string;
  username: string;
  avatar: string;
  phone: string;
};
