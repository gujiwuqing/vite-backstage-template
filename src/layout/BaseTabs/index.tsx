import React from "react";
import { Tabs } from "antd";
import { getTabList } from "@/utils/util";
import { useSnapshot } from "valtio";
import state from "@/store/store";
import defaultMenus from "@/router/menu";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TabsStyle = styled.div`
  padding: 12px 24px;
  background-color: #fff;
`;
const BaseTabs: React.FC = () => {
  const { tabs, changeActiveKey, activeKey, changeTabs } = useSnapshot(state);
  const items = getTabList(tabs, defaultMenus);
  const navigate = useNavigate();

  const onChange = (key: string) => {
    console.log(key);
    navigate(key);
    changeActiveKey(key);
  };

  return (
    <TabsStyle>
      <Tabs
        defaultActiveKey={activeKey}
        items={items}
        onChange={onChange}
        type="editable-card"
        hideAdd={true}
        onEdit={(targetKey, action) => {
          console.log(targetKey, "targetKey");
          console.log(action, "action");
          if (action == "remove") {
            const tabs = state.tabs.filter(
              (item: string) => item !== targetKey
            );
            changeTabs(tabs);
          }
        }}
      />
    </TabsStyle>
  );
};

export default BaseTabs;
