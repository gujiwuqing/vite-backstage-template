import {BaseListDTO} from '@/service/base';

export interface RoleVO {
  title: string;
  pageNo: string;
  pageSize: string;
}


export interface RoleItemDTO {
  id: string;
  title: string;
  sort: number;
  type: string;
  status: string;
  createdAt:string;
}


export interface RoleListDTO extends BaseListDTO<RoleItemDTO> {

}
