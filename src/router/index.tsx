import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import LayoutPage from '@/layout';
import LoginPage from '@/pages/login';
import NotFound from '@/pages/404';
const Home = lazy(() => import('@/pages/home'));
const Editor = lazy(() => import('@/pages/editor'));
const UserListPage = lazy(() => import('@/pages/user'));
const UserCreate = lazy(() => import('@/pages/user/create'));
const RoleListPage = lazy(() => import('@/pages/role'));
const RoleCreate = lazy(() => import('@/pages/role/create'));
const MenuPage = lazy(() => import('@/pages/menu'));
const TourPage = lazy(() => import('@/pages/common/tour'));
const WatermarkPage = lazy(() => import('@/pages/common/watermark'));
const LinePage = lazy(() => import('@/pages/echarts/line'));
const AreaPage = lazy(() => import('@/pages/echarts/area'));
const RadarPage = lazy(() => import('@/pages/echarts/radar'));
const TreePage = lazy(() => import('@/pages/echarts/tree'));
const MenuCreate = lazy(() => import('@/pages/menu/create'));

const routers = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/editor',
        element: <Editor />,
      },
      {
        path: '/user/list',
        element: <UserListPage />,
      },
      {
        path: '/user/create',
        element: <UserCreate />,
      },
      {
        path: '/role/list',
        element: <RoleListPage />,
      },
      {
        path: '/role/create',
        element: <RoleCreate />,
      },
      {
        path: '/menu/list',
        element: <MenuPage />,
      },
      {
        path: '/menu/create',
        element: <MenuCreate />,
      },
      {
        path: '/common/tour',
        element: <TourPage />,
      },
      {
        path: '/common/watermark',
        element: <WatermarkPage />,
      },
      {
        path: '/echarts/line',
        element: <LinePage />,
      },
      {
        path: '/echarts/area',
        element: <AreaPage />,
      },
      {
        path: '/echarts/radar',
        element: <RadarPage />,
      },
      {
        path: '/echarts/tree',
        element: <TreePage />,
      },
    ],
  },

  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routers;
