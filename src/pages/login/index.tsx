import { UserLogin } from "@/service/user";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginFormPage, ProFormText } from "@ant-design/pro-components";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import state from "@/store/store";
import { Form, message, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { getCaptcha } from "@/service";

const StyledImage = styled.img`
  cursor: pointer;
`;
export default () => {
  const { changeToken, changeMenus, changeUserInfo, changeButtonList } =
    useSnapshot(state);
  const [captcha, setCaptcha] = useState({
    id: "",
    answer: "",
  });
  const [imageBase64, setImageBase64] = useState("");
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const { status, data } = await UserLogin({
      ...values,
      id: captcha.id,
      answer: values.captcha,
      captcha: undefined,
    });
    if (status == 200) {
      message.success("登录成功");
      changeToken(data.token);
      const menuList = data.role?.menus || [];
      const menus: any[] = [];
      const buttonList: string[] = [];
      menuList.forEach((menu: { type: string; code: string }) => {
        if (menu.type === "menu") {
          menus.push(menu);
        } else {
          buttonList.push(menu.code);
        }
      });
      changeMenus(menus || []);
      changeButtonList(buttonList.length ? buttonList.join(",") : "");
      changeUserInfo({
        username: data.username || "",
        avatar:
          data.avatar ||
          "https://github.githubassets.com/images/modules/logos_page/Octocat.png",
        email: data.email || "",
        phone: data.phone || "",
      });
      navigate("/");
    }
  };

  useEffect(() => {
    handleGetCaptcha();
  }, []);

  const handleGetCaptcha = async () => {
    const { data } = await getCaptcha();
    setCaptcha({
      id: data.id,
      answer: "",
    });
    setImageBase64(data.imageBase64);
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
            placeholder={"用户名: root,admin or visitor"}
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

          <Form.Item>
            <Space>
              <Form.Item
                name="captcha"
                noStyle
                rules={[{ required: true, message: "请输入验证码" }]}
              >
                <Input
                  style={{ width: 200 }}
                  placeholder="请输入验证码！"
                  size="large"
                  prefix={<LockOutlined className={"prefixIcon"} />}
                />
              </Form.Item>
              <StyledImage
                src={imageBase64}
                alt=""
                onClick={handleGetCaptcha}
              />
            </Space>
          </Form.Item>
        </>
      </LoginFormPage>
    </div>
  );
};
