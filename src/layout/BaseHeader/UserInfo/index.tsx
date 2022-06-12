import {DownOutlined, SmileOutlined} from '@ant-design/icons';
import {Dropdown, Menu, Space} from 'antd';
import React, {memo} from 'react';
import {useNavigate} from 'react-router-dom';
import {tokenAtom, menusAtom} from '@/store';
import {useAtom} from 'jotai';

const UserInfo = () => {
  const navigate = useNavigate();
  const [, setToken] = useAtom(tokenAtom);
  const [, setMenus] = useAtom(menusAtom);
  const menu = (
    <Menu
      items={[
        {
          key: 'layout',
          label: (
            <span onClick={() => {
              setToken('');
              setMenus('');
              navigate('/login', {
                replace: true
              });
            }}>
            退出登录
          </span>
          ),
        },
      ]}
    />
  );
  return (
    <Dropdown overlay={menu}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Hover me
          <DownOutlined/>
        </Space>
      </a>
    </Dropdown>
  );
};

export default memo(UserInfo);
