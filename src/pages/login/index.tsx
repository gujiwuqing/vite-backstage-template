import { UserLogin } from "@/service/user";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginFormPage, ProFormText } from "@ant-design/pro-components";
import React from "react";
import { useSnapshot } from "valtio";
import state from "@/store/store";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export default () => {
  const { changeToken } = useSnapshot(state);
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    const { code, data } = await UserLogin(values);
    if (code == 200) {
      message.success("登录成功");
      changeToken(data.token);
      navigate("/");
    }
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "calc(100vh - 48px)",
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="Github"
        subTitle="全球最大的代码托管平台"
        onFinish={onFinish}
      >
        <>
          <ProFormText
            name="username"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={"prefixIcon"} />,
            }}
            placeholder={"用户名: admin or user"}
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={"prefixIcon"} />,
            }}
            placeholder={"密码: 123456"}
            rules={[
              {
                required: true,
                message: "请输入密码！",
              },
            ]}
          />
          {/* <ProFormCaptcha
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={"prefixIcon"} />,
            }}
            captchaProps={{
              size: "large",
            }}
            placeholder={"请输入验证码"}
            captchaTextRender={(timing, count) => {
              if (timing) {
                return `${count} ${"获取验证码"}`;
              }
              return "获取验证码";
            }}
            name="captcha"
            rules={[
              {
                required: true,
                message: "请输入验证码！",
              },
            ]}
            onGetCaptcha={async () => {
              message.success("获取验证码成功！验证码为：1234");
            }}
          /> */}
        </>
      </LoginFormPage>
    </div>
  );
};
