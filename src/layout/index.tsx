import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import BaseMenu from './BaseMenu';
import BaseHeader from '@/layout/BaseHeader';
import {Card} from 'antd';
import React, {Suspense, useEffect} from 'react';
import styles from './index.module.less';
import {Spin} from 'antd';
import {useAtom} from 'jotai';
import {menusAtom, tokenAtom} from '@/store';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menus] = useAtom(menusAtom);
  const [token] = useAtom(tokenAtom);
  useEffect(() => {
    if (!token) {
      navigate('/login', {replace: true});
    }else {
      const arr: string[] = [];
      menus && JSON.parse(menus).forEach((item: { path: string; }) => {
        arr.push(item.path);
      });
      if (!arr.includes(location.pathname)) {
        navigate('/404', {replace: true});
      }
    }
  }, [location.pathname]);
  return (
    <div className={styles.container}>
      <BaseMenu/>
      <div className={styles.content}>
        <BaseHeader/>
        <Suspense fallback={<Spin/>}>
          <Card style={{minHeight: '100vh'}}>
            <Outlet/>
          </Card>
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
