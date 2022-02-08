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

  const onJump = (path: string) => {
    navigate(path)
  }
  return (
    <div style={{maxWidth: 256, height: '100%'}}>
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
            if (item.children && item.children.length > 0) {
              return <SubMenu key="sub2" icon={<PieChartOutlined/>} title={item.text} >
                {
                  item.children.map((t:any)=>{
                    return   <Menu.Item key={t.path} onClick={() => {
                      onJump(t.path)
                    }}>{t.text}</Menu.Item>
                  })
                }
              </SubMenu>
            }
           else {
              return (
                <Menu.Item key={item.path} icon={<PieChartOutlined/>} onClick={() => {
                  onJump(item.path)
                }}>
                  {item.text}
                </Menu.Item>
              )
            }
          })
        }
      </Menu>
    </div>
  );
}


export default BaseMenu;
