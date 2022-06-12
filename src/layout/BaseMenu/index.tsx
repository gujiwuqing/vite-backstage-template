import {Layout, Menu} from 'antd';
import React, {useEffect} from 'react';
import {PieChartOutlined,} from '@ant-design/icons';
import defaultMenus from '@/router/menu';
import {useNavigate, useLocation} from 'react-router-dom';
import {useAtom} from 'jotai';
import {collapsedAtom, menusAtom} from '@/store';


const {SubMenu} = Menu;
const {Sider} = Layout;

const BaseMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed] = useAtom(collapsedAtom);
  const [menus] = useAtom(menusAtom);
  // 树拍平
  const toArray = (menuList) => {
    const arr = [];

    const bianli = (menus, pPath) => {
      menus.forEach(item => {
        const newItem = {...item, pPath};
        arr.push(newItem);

        if (newItem.children && newItem.children.length > 0) {
          bianli(newItem.children, newItem.path);
        }
        delete newItem.children;
      });
    };

    bianli(menuList, null);

    return arr;
  };


// 数组转树
  const tranListToTreeData = (arr: any[]) => {
    const treeList: any[] = []; // 最终要产出的树状数据的数组
    const mapObj = {}; // 存储映射关系

    arr.forEach(item => {
      if (!item.children) {
        item.children = [];
      }
      mapObj[item.path] = item;
    });

    arr.forEach(item => {
      const parent = mapObj[item.pPath];
      if (parent) {
        // 对于每一个元素来说，先找它的上级
        parent.children.push(item); // 如果能找到，说明它有上级，则要把它添加到上级的children中去
      } else {
        treeList.push(item); // 如果找不到，说明它没有上级，直接添加到 treeList
      }
    });
    return treeList; // 返回出去
  };
  const getMenus = () => {
    const apiData = JSON.parse(menus);
    const newMenus = toArray(defaultMenus);
    const newApiData = apiData.map(item => item.path);
    const filterMenus = newMenus.filter(item => newApiData.includes(item.path));
    return JSON.parse(JSON.stringify(tranListToTreeData(filterMenus)))
  }
  const Menus = menus ? getMenus() : defaultMenus;
  const onJump = (path: string) => {
    navigate(path);
  };
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} style={{minHeight: '100vh'}}>
      <Menu
        selectedKeys={[location.pathname]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        {
          Menus.map(item => {
            if (item.children && item.children.length > 0) {
              return <SubMenu key={item.path} icon={<PieChartOutlined/>} title={item.title}>
                {
                  item.children.map((t: any) => {
                    return <Menu.Item key={t.path} onClick={() => {
                      onJump(t.path);
                    }}>{t.title}</Menu.Item>;
                  })
                }
              </SubMenu>;
            } else {
              return (
                <Menu.Item key={item.path} icon={<PieChartOutlined/>} onClick={() => {
                  onJump(item.path);
                }}>
                  {item.title}
                </Menu.Item>
              );
            }
          })
        }
      </Menu>
    </Sider>
  );
};


export default BaseMenu;
