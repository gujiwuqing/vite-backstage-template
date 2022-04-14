import {Layout, Menu} from 'antd';
import React from 'react';
import {PieChartOutlined,} from '@ant-design/icons';
import menus from '@/router/menu';
import {useNavigate} from 'react-router-dom';
import {useAtom} from 'jotai'
import {activeKeyAtom, collapsedAtom} from "@/store";


const {SubMenu} = Menu;
const {Sider} = Layout;

const BaseMenu = () => {
  const navigate = useNavigate()
  const [collapsed] = useAtom(collapsedAtom)
  const [activeKey, setActiveKey] = useAtom(activeKeyAtom);
  const onJump = (path: string) => {
    navigate(path);
    setActiveKey(path)
  }
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} style={{minHeight: '100vh'}}>
      <Menu
        defaultSelectedKeys={[activeKey]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
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
    </Sider>
  );
}


export default BaseMenu;
