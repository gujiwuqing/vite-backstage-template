import {RouterProvider, useRoutes} from 'react-router-dom';
import "antd/dist/reset.css";
import routers from "@/router";
import {ConfigProvider} from 'antd';
import React from 'react';
import {themeColorAtom} from '@/store';
import {useAtom} from 'jotai';
function App() {
  const  [themeColor] = useAtom(themeColorAtom)
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
