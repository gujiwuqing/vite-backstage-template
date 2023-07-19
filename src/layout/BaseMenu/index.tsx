import defaultMenus from "@/router/menu";
import { Layout, Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import state from "@/store/store";
import { useSnapshot } from "valtio";
import { getMenuTree } from "@/utils/util";

const BaseMenu: React.FC = () => {
  const { Sider } = Layout;
  const { collapsed, menus, activeKey, changeActiveKey, changeTabs, tabs } =
    useSnapshot(state);
  const navigate = useNavigate();

  interface MenuInfo {
    key: string;
    keyPath: string[];
    /** @deprecated This will not support in future. You should avoid to use this */
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
  }
  const handleClick = (info: MenuInfo) => {
    console.log(info);
    navigate(info.key);
    changeActiveKey(info.key);
    const newTabs = [...tabs, info.key];
    changeTabs(newTabs);
  };
  return (
    <Sider width={200} collapsed={collapsed}>
      <Menu
        theme="light"
        mode="inline"
        style={{ height: "100vh", borderRight: 0 }}
        items={menus.length ? getMenuTree(menus) : defaultMenus}
        onClick={handleClick}
        defaultSelectedKeys={[activeKey]}
      />
    </Sider>
  );
};

export default BaseMenu;
