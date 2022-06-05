import React,{lazy, ReactNode, Suspense} from 'react';
import {RouteObject} from "react-router-dom";
import Layout from '../layout'

const Home = lazy(() => import('../pages/home'))
const User = lazy(() => import('../pages/user'))
const Editor = lazy(() => import('../pages/editor'))
const Login = lazy(() => import('../pages/login'))
const MenuList = lazy(() => import('../pages/menu/list'))


const LazyLoad = (Children: ReactNode): ReactNode => {
  return (
    <Suspense fallback={<h1>loading</h1>}>
      {Children}
    </Suspense>
  )
}

const routers: RouteObject[] = [
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: LazyLoad(<Home/>)
      },
      {
        path: '/user/list',
        element: LazyLoad((<User/>))
      }, {
        path: '/menu/list',
        element: LazyLoad((<MenuList/>))
      },
      {
        path: '/editor',
        element: LazyLoad((<Editor/>))
      }
    ]
  },
  {
    path:'/login',
    element:LazyLoad(<Login/>)
  }
]

export default routers;
