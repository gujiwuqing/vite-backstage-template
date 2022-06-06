import {Outlet} from 'react-router-dom';
import BaseMenu from './BaseMenu';
import BaseHeader from '@/layout/BaseHeader';
import {Card} from 'antd';
import React, {Suspense} from 'react';
import styles from './index.module.less';
import {Spin} from 'antd';

const Layout = () => {
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
