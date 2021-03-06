import React, {lazy} from 'react';
import {RouteObject} from 'react-router-dom';
import Layout from '../layout';
import MenuList from '@/pages/menu/list';
import Login from '@/pages/login';
import NotFound from '@/pages/404';

const Home = lazy(() => import('../pages/home'));
const UserList = lazy(() => import('../pages/user/list'));
const UserCreate = lazy(() => import('../pages/user/create'));
const Editor = lazy(() => import('../pages/editor'));
// const Login = lazy(() => import('../pages/login'));
const RoleList = lazy(() => import('../pages/role/list'));
const RoleCreate = lazy(() => import('../pages/role/create'));
const RolePermission = lazy(() => import('../pages/role/permission'));
const MenuCreate = lazy(() => import('../pages/menu/create'));
const LoggerList = lazy(() => import('../pages/logger'));


const routers: RouteObject[] = [
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: '/user/list',
        element: <UserList/>
      }, {
        path: '/user/create',
        element: <UserCreate/>
      },
      {
        path: '/menu/list',
        element: <MenuList/>
      }, {
        path: '/menu/create',
        element: <MenuCreate/>
      }, {
        path: '/role/list',
        element: <RoleList/>
      }, {
        path: '/role/create',
        element: <RoleCreate/>
      }, {
        path: '/role/permission',
        element: <RolePermission/>
      },
      {
        path: '/editor',
        element: <Editor/>
      }, {
        path: '/logger',
        element: <LoggerList/>
      }
    ]
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '*',
    element: <NotFound/>
  }
];

export default routers;
