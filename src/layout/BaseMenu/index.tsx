import defaultMenus from "@/router/menu";
import { collapsedAtom, menusAtom } from "@/store";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useAtom } from "jotai";
import React from "react";
import { useNavigate } from "react-router-dom";

const BaseMenu: React.FC = () => {
  const [collapsed] = useAtom(collapsedAtom);
  const [menus] = useAtom(menusAtom);
  const navigate = useNavigate();
  interface MenuInfo {
    key: string;
    keyPath: string[];
    /** @deprecated This will not support in future. You should avoid to use this */
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
  }
  const handleClick = (info: MenuInfo) => {
    navigate(info.key);
  };
  return (
    <Menu
      theme="dark"
      mode="inline"
      inlineCollapsed={collapsed}
      style={{ height: "100%", borderRight: 0 }}
      items={menus ? JSON.parse(menus) : defaultMenus}
      onClick={handleClick}
    />
  );
};

export default BaseMenu;
