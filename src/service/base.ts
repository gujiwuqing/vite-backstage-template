import { MenuItemDTO } from './menu/menuDTO';
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
  id?: string;
  children?: MenusItemDTO[];
}
