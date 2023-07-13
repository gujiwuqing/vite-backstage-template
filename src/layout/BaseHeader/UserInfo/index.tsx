import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const navigate = useNavigate();
  const menu = (
    <Menu
      items={[
        {
          key: "layout",
          label: (
            <span
              onClick={() => {
                navigate("/login", {
                  replace: true,
                });
                localStorage.clear();
              }}
            >
              退出登录
            </span>
          ),
        },
      ]}
    />
  );
  return (
    <Dropdown overlay={menu}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Hover me
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default memo(UserInfo);
