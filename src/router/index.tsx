import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import LayoutPage from "@/layout";
import LoginPage from "@/pages/login";
import NotFound from "@/pages/404";
const Home = lazy(() => import("@/pages/home"));
const Editor = lazy(() => import("@/pages/editor"));
const UserListPage = lazy(() => import("@/pages/user"));
const RoleListPage = lazy(() => import("@/pages/role"));
const TourPage = lazy(() => import("@/pages/common/tour"));
const WatermarkPage = lazy(() => import("@/pages/common/watermark"));
const LinePage = lazy(() => import("@/pages/echarts/line"));
const AreaPage = lazy(() => import("@/pages/echarts/area"));
const RadarPage = lazy(() => import("@/pages/echarts/radar"));
const TreePage = lazy(() => import("@/pages/echarts/tree"));

const routers = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/editor",
        element: <Editor />,
      },
      {
        path: "/user/list",
        element: <UserListPage />,
      },
      {
        path: "/role/list",
        element: <RoleListPage />,
      },
      {
        path: "/common/tour",
        element: <TourPage />,
      },
      {
        path: "/common/watermark",
        element: <WatermarkPage />,
      },
      {
        path: "/echarts/line",
        element: <LinePage />,
      },
      {
        path: "/echarts/area",
        element: <AreaPage />,
      },
      {
        path: "/echarts/radar",
        element: <RadarPage />,
      },
      {
        path: "/echarts/tree",
        element: <TreePage />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routers;
