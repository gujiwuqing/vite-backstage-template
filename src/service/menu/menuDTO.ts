import { BaseListDTO } from "@/service/base";

export interface MenuVO {
  title: string;
  pageNo: string;
  pageSize: string;
}

export interface MenuItemDTO {
  id: string;
  title: string;
  sort?: number;
  type?: string;
  status?: string;
  parentMenuId?: string;
  path?: string;
  icon?: string;
  level?: string;
}

export interface MenuListDTO extends BaseListDTO<MenuItemDTO> {}
