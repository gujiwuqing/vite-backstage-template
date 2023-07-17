import request from "@/utils/request";

// 获取角色分页
export const getRolePage = (params: any) => {
  return request.get("/role/page", { params });
};

// 获取角色列表
export const getRoleList = () => {
  return request("/role/list");
};

// 新增角色
export const createRole = (data: any) => {
  return request.post("/role", data);
};

// 更新角色
export const updateRole = (data: any) => {
  return request.post("/role/update", data);
};

// 获取角色详情
export const getRoleInfo = (id: string) => {
  return request.get(`/role?id=${id}`);
};

// 更新角色权限
export const updateRolePermission = (data: any) => {
  return request.post("/role/permission", data);
};

// 删除角色
export const deleteRole = (data: { id: string }) => {
  return request.post("/role/deleteOneById", data);
};
