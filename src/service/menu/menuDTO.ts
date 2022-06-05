import {BaseListDTO} from '@/service/base';

export interface MenuVO {
  title: string;
  pageNo: string;
  pageSize: string;
}


export interface MenuItemDTO {
  id: string;
  title: string;
  sort: number;
  type: string;
  status: string;
}


export interface MenuListDTO extends BaseListDTO<MenuItemDTO> {

}
