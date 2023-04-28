import {RouterProvider, useRoutes} from 'react-router-dom';
import "antd/dist/reset.css";
import routers from "@/router";
import {ConfigProvider} from 'antd';
import React from 'react';
import {themeColorAtom} from '@/store';
import state from '@/store/store'
import {useAtom} from 'jotai';
import {useSnapshot} from 'valtio';
function App() {
    const {themeColor} =useSnapshot(state)
  return (
      <ConfigProvider theme={{
        token: {
          colorPrimary: themeColor|| "#1890ff",
        },
      }}>
        <RouterProvider router={routers} />
      </ConfigProvider>
  )
}

export default App;
