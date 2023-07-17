import request from "@/utils/request";

export const getRolePage = (params: any) => {
  return request.get("/role/page", { params });
};

export const getRoleList = () => {
  return request("/role/list");
};

export const createRole = (data: any) => {
  return request.post("/role", data);
};

export const getRoleInfo = (id: string) => {
  return request.get(`/role?id=${id}`);
};

export const updateRolePermission = (data: any) => {
  return request.post("/role/permission", data);
};

export const deleteRole = (data: { id: string }) => {
  return request.post("/role/deleteOneById", data);
};
