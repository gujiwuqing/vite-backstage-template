import state from "@/store/store";
import {
  GithubOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useSnapshot } from "valtio";
import FullScreen from "./Fullscreen";
import Language from "./Language";
import ThemeColor from "./ThemeColor";
import UserInfo from "./UserInfo";

const Header = styled.header`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  background-color: #242f42;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  height: 40px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 20px;
`;

const BaseHeader = () => {
  const { collapsed, changeCollapsed, userInfo } = useSnapshot(state);
  const { t } = useTranslation();
  const toggleCollapsed = () => {
    changeCollapsed(!collapsed);
  };
  return (
    <Header>
      <HeaderLeft>
        <Title>{t("title")}</Title>
        <Button type="primary" onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </HeaderLeft>
      <HeaderRight>
        <ThemeColor />
        <Language />
        <FullScreen />
        <UserInfo userInfo={userInfo} />
        <GithubOutlined
          style={{ fontSize: 24, margin: "0 24px" }}
          onClick={() => {
            window.location.href =
              "https://github.com/gujiwuqing/vite-backstage-template";
          }}
        />
      </HeaderRight>
    </Header>
  );
};

export default BaseHeader;
