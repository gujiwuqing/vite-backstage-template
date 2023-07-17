import request from "@/utils/request";

// 获取菜单分页
export const getMenuPage = (params: any) => {
  return request.get("/menu/page", { params });
};

// 获取菜单列表
export const getMenuList = () => {
  return request.get("/menu/list");
};

//新增菜单
export const createMenu = (data: any) => {
  return request.post("/menu", data);
};

// 获取菜单详情
export const getMenuInfo = (id: string) => {
  return request.get(`/menu?id=${id}`);
};

// 更新菜单
export const updateMenu = (data: any) => {
  return request.post("/menu/update", data);
};

// 删除菜单
export const deleteMenu = (data: { id: string }) => {
  return request.post("/menu/deleteOneById", data);
};
