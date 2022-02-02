import {Menu} from 'antd';
import React from 'react';
import {useSelector} from "react-redux";
import {PieChartOutlined,} from '@ant-design/icons';
import menus from '@/router/menu';
import {useNavigate} from 'react-router-dom';

const {SubMenu} = Menu;

const BaseMenu = () => {
  const navigate = useNavigate()
  const {collapsed} = useSelector((state: any) => ({
    collapsed: state.counter.collapsed,
  }))

  const onJump=(path:string)=>{
    navigate(path)
  }
  return (
    <div style={{maxWidth: 256, minHeight: '100vh'}}>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        style={{minHeight: '100vh'}}
      >
        {
          menus.map(item => {
            return (
              <Menu.Item key={item.path} icon={<PieChartOutlined/>} onClick={()=>{
                onJump(item.path)
              }}>
                {item.text}
              </Menu.Item>
            )
          })
        }
        {/*<SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">*/}
        {/*  <Menu.Item key="9">Option 9</Menu.Item>*/}
        {/*  <Menu.Item key="10">Option 10</Menu.Item>*/}
        {/*  <SubMenu key="sub3" title="Submenu">*/}
        {/*    <Menu.Item key="11">Option 11</Menu.Item>*/}
        {/*    <Menu.Item key="12">Option 12</Menu.Item>*/}
        {/*  </SubMenu>*/}
        {/*</SubMenu>*/}
      </Menu>
    </div>
  );
}


export default BaseMenu;
