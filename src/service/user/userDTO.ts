import { PageVO } from "@/service/base";

export interface UserLoginTO {
  username: string;
  password: string;
}

export interface UserDTO {
  username: string;
  password: string;
  email: string;
  role: string;
}

export interface UserItemDTO extends UserDTO {
  createdAt: string;
  id: string;
}

export interface UserPageDTO extends PageVO {
  username?: string;
}
