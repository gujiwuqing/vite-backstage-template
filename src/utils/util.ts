// 获取tabList
import { MenusItemDTO } from '@/service/base';
import { MenuItemDTO } from '@/service/menu/menuDTO';
import { proxy, snapshot } from 'valtio';
import { antdIcons } from '@/assets/antd-icons';
import state from '@/store/store';
import React from 'react';

//menus有children的时候，children的path是不是在tabs里面，如果在，就把父级的path放进去
export const getTabList = (tabs = [], menus: MenusItemDTO[] = []) => {
  let tabList: MenusItemDTO[] = [];
  menus.forEach((item) => {
    if (item.children) {
      item.children.map((child) => {
        if (tabs.includes(child.key)) {
          tabList.push(child);
        }
      });
    } else {
      if (tabs.includes(item.key)) {
        tabList.push(item);
      }
    }
  });
  return tabList;
};

// 获取面包屑
export const getBreadcrumb = (tabList = [], pathname) => {
  let breadcrumb: any[] = [];
  const getBreadcrumbItem = (tabList = [], pathname) => {
    tabList.forEach((item) => {
      if (item.children) {
        getBreadcrumbItem(item.children, pathname);
      } else {
        if (item.path === pathname) {
          breadcrumb.push(item);
        }
      }
    });
  };
  getBreadcrumbItem(tabList, pathname);
  return breadcrumb;
};

// 获取菜单树
export const getMenuTree = (menus: MenuItemDTO[]) => {
  const resultArray: MenusItemDTO[] = menus
    .filter((t) => t.level === '1' && t.type == 'menu')
    .map((item: MenuItemDTO) => {
      return {
        label: item.title,
        title: item.title,
        icon: item.icon
          ? antdIcons[item.icon] && React.createElement(antdIcons[item.icon])
          : '',
        key: item.path || '',
        id: item.id,
        sort: item.sort,
      };
    });
  menus.forEach((item: MenuItemDTO) => {
    if (item.level === '2') {
      const parentItem = resultArray.find(
        (parent) => parent.id === item.parentMenuId,
      );
      if (parentItem) {
        if (!parentItem.children) {
          parentItem.children = [];
        }
        parentItem.children.push({
          label: item.title,
          title: item.title,
          icon: item.icon
            ? antdIcons[item.icon] && React.createElement(antdIcons[item.icon])
            : '',
          key: item.path || '',
          id: item.id,
          sort: item.sort,
        });
      }
    }
  });
  return resultArray;
};

// 判断是否有按钮权限
export const hasButtonPermission = (code: string) => {
  const store = snapshot(state);
  const buttonList = store.buttonList;
  return buttonList.split(',').includes(code);
};
