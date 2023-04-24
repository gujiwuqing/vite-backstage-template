import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import routers from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider>
    <RouterProvider router={routers} />
  </ConfigProvider>
);
