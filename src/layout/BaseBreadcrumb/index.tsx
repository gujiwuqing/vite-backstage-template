import { Breadcrumb } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";
import state from "@/store/store";
import { getMenuTree } from "@/utils/util";
import defaultMenus from "@/router/menu";
import styled from "styled-components";

const BreadcrumbWrapper = styled(Breadcrumb)`
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 16px;
  background: #fff;
`;
const BaseBreadcrumb = ({ pathname = "" }) => {
  const { menus } = useSnapshot(state);
  function itemRender() {
    let routes: any[] = [];
    const breadcrumbList = menus.length ? getMenuTree(menus) : defaultMenus;
    console.log("breadcrumbList", breadcrumbList);
    breadcrumbList.map((item) => {
      if (item.key == pathname) {
        routes.push(item);
      } else {
        if (item.children && item.children.length) {
          item.children.map((child) => {
            if (child.key == pathname) {
              routes = [{ ...item, children: undefined }, { ...child }];
            }
          });
        }
      }
    });
    console.log("routes", routes);
    return routes.length ? routes : defaultMenus;
  }
  return <BreadcrumbWrapper routes={itemRender()} />;
};

export default BaseBreadcrumb;
