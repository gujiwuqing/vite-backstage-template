import {Outlet} from 'react-router-dom';
import BaseMenu from "./BaseMenu";
import BaseHeader from "@/layout/BaseHeader";
import {Card} from "antd";
import React from 'react';
import styles from './index.module.less'

const Layout = () => {
  return (
      <div className={styles.container}>
        <BaseMenu/>
        <div className={styles.content}>
          <BaseHeader/>
          <Card style={{minHeight: '100vh'}}>
            <Outlet/>
          </Card>
        </div>
      </div>
  )
}

export default Layout;
