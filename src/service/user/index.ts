import request from "@/utils/request";
import { UserDTO, UserLoginTO, UserPageDTO } from "./userDTO";

export const UserLogin = (data: UserLoginTO) => {
  return request.post("/user/login", data);
};

export const saveUser = (data: UserDTO) => {
  return request.post("/user", data);
};

export const getUserPage = (params: UserPageDTO) => {
  return request.get("/user/page", {
    params,
  });
};
