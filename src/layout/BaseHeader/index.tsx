import state from "@/store/store";
import {
  GithubOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useSnapshot } from "valtio";
import FullScreen from "./Fullscreen";
import Language from "./Language";
import ThemeColor from "./ThemeColor";
import UserInfo from "./UserInfo";

const Header = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  background-color: #242f42;
`;

const HeaderLeft = styled.div`
  display: flex;
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
`;

const BaseHeader = () => {
  // const [collapsed, setCollapsed] = useAtom(collapsedAtom);
  const { collapsed, changeCollapsed } = useSnapshot(state);
  const { t, i18n } = useTranslation();
  const onClick = () => {
    changeCollapsed(!collapsed);
  };
  return (
    <Header>
      <HeaderLeft>
        <Title>{t("title")}</Title>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick,
          }
        )}
      </HeaderLeft>
      <HeaderRight>
        <ThemeColor />
        <Language />
        <FullScreen />
        <UserInfo />
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
