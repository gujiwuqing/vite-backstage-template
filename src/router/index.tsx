import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import LayoutPage from "@/layout";
const Home = lazy(() => import("@/pages/home"));
const Editor = lazy(() => import("@/pages/editor"));
const UserListPage = lazy(() => import("@/pages/user"));
const RoleListPage = lazy(() => import("@/pages/role"));
import LoginPage from "@/pages/login";
import NotFound from "@/pages/404";

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
