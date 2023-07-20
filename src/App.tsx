import routers from "@/router";
import state from "@/store/store";
import { ConfigProvider, Spin } from "antd";
import "antd/dist/reset.css";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { useSnapshot } from "valtio";

function App() {
  const { themeColor } = useSnapshot(state);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: themeColor || "#1890ff",
        },
      }}
    >
      <RouterProvider router={routers} fallbackElement={<Spin />} />
    </ConfigProvider>
  );
}

export default App;
