// 获取tabList

import { MenuItemDTO } from '@/service/base';

//menus有children的时候，children的path是不是在tabs里面，如果在，就把父级的path放进去
export const getTabList = (tabs = [], menus = []) => {
  let tabList: any[] = [];
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
export const getMenuTree = (menus = []) => {
  interface resultArrayItem {
    label: string;
    icon: string;
    key: string;
    id?: string;
  }
  const resultArray: MenuItemDTO[] = [];
  menus.forEach((item) => {
    if (item.level === "1") {
      resultArray.push({
        label: item.title,
        icon: item.icon,
        key: item.path,
        id: item.id,
      });
    } else if (item.level === "2") {
      const parentItem = resultArray.find(
        (parent) => parent.id === item.parentMenuId
      );
      if (parentItem) {
        if (!parentItem.children) {
          parentItem.children = [];
        }
        parentItem.children.push({
          label: item.title,
          icon: item.icon,
          key: item.path,
        });
      }
    }
  });
  return resultArray;
};
