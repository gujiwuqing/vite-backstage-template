import {lazy, ReactNode, Suspense} from 'react';
import {RouteObject} from "react-router-dom";
import Layout from '../layout'

const Home = lazy(() => import('../pages/home'))
const About = lazy(() => import('../pages/about'))


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
        path: '/about',
        element: LazyLoad((<About/>))
      }
    ]
  }
]

export default routers;
