import request from "@/utils/request";

export const getMenuPage = (params: any) => {
  return request.get("/menu/page", { params });
};

export const getMenuList = () => {
  return request.get("/menu/list");
};

export const createMenu = (data: any) => {
  return request.post("/menu", data);
};
