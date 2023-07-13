import request from "@/utils/request";

export const getCaptcha = () => {
  return request.get("/captcha");
};
