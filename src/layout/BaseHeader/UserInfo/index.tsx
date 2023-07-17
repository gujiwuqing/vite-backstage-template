import { UserInfo } from "@/service/base";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type UserInfoProps = {
  userInfo: UserInfo;
};

const UserInfoWrapper = styled.div`
  cursor: pointer;
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
`;

const UserInfoPage = ({ userInfo }: UserInfoProps) => {
  const navigate = useNavigate();
  const items = [
    {
      key: "手机号",
      label: (
        <MenuWrapper>
          <span>手机号:</span>
          <span>{userInfo.phone}</span>
        </MenuWrapper>
      ),
    },
    {
      key: "邮箱",
      label: (
        <MenuWrapper>
          <span>邮箱:</span>
          <span>{userInfo.email}</span>
        </MenuWrapper>
      ),
    },
    {
      key: "layout",
      label: (
        <MenuWrapper
          onClick={() => {
            navigate("/login", {
              replace: true,
            });
            localStorage.clear();
          }}
        >
          退出登录
        </MenuWrapper>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <UserInfoWrapper>
        <Space>
          {userInfo.username}
          <DownOutlined />
        </Space>
      </UserInfoWrapper>
    </Dropdown>
  );
};

export default memo(UserInfoPage);
