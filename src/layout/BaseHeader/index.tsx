import React from 'react';
import style from './index.module.less';
import {GithubOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import ThemeColor from './ThemeColor';
import UserInfo from './UserInfo';
import {useAtom} from 'jotai';
import {collapsedAtom} from '@/store';
import FullScreen from './Fullscreen';
import './index.less';

const BaseHeader = () => {
  const [collapsed, setCollapsed] = useAtom(collapsedAtom);
  const onClick = () => {
    setCollapsed(!collapsed);
  };
  return (
    <header className={style.header}>
      <div className="flex items-center">
        <span className="mr-3">后台管理系统</span>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick,
        })}
      </div>
      <div className={style.header_right}>
        <ThemeColor/>
        <UserInfo/>
        <FullScreen/>
        <GithubOutlined
          className={style.icon}
          onClick={() => {
            window.location.href = 'https://github.com/gujiwuqing/vite-backstage-template';
          }}
        />
      </div>
    </header>
  );
};

export default BaseHeader;
