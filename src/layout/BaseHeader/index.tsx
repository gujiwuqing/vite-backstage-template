import React from 'react';
import style from './index.module.less';
import { MenuUnfoldOutlined, MenuFoldOutlined, GithubOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCollapsed } from '@/store/counterSlice';

const BaseHeader = () => {
  const dispatch = useDispatch();
  const { collapsed } = useSelector((state: any) => ({
    collapsed: state.counter.collapsed,
  }));
  const onClick = () => {
    dispatch(toggleCollapsed());
  };
  return (
    <header className={style.header}>
      <div>
        <span style={{ marginRight: 10 }}>后台管理系统</span>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick,
        })}
      </div>
      <div className={style.header_right}>
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
