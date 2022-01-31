import {Outlet} from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <header>header</header>
      <div>
        <Outlet/>
      </div>
      <footer>footer</footer>
    </div>
  )
}

export default Layout;
