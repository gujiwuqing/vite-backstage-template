import request from "@/utils/request";
import { UserDTO, UserLoginTO, UserPageDTO } from "./userDTO";

export const UserLogin = (data: UserLoginTO) => {
  return request.post("/user/login", data);
};

export const getUserPage = (params: UserPageDTO) => {
  return request.get("/user/page", {
    params,
  });
};

export const saveUser = (data: UserDTO) => {
  return request.post("/user", data);
};

// 更新用户
export const updateUser = (data: any) => {
  return request.post("/user/update", data);
};

// 获取用户详情
export const getUserInfo = (id: string) => {
  return request.get(`/user?id=${id}`);
};

// 删除用户
export const deleteUser = (data: { id: string }) => {
  return request.post("/user/deleteOneById", data);
};
