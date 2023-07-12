import { Card, Layout, Spin } from "antd";
import React, { Suspense } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BaseHeader from "./BaseHeader";
import BaseMenu from "./BaseMenu";
import BaseTabs from "@/layout/BaseTabs";

const { Content } = Layout;
const LayoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login", { replace: true });
  //   } else {
  //     const arr: string[] = [];
  //     menus &&
  //       JSON.parse(menus).forEach((item: { path: string }) => {
  //         arr.push(item.path);
  //       });
  //     if (!arr.includes(location.pathname)) {
  //       navigate("/404", { replace: true });
  //     }
  //   }
  // }, [location.pathname]);
  return (
    <Layout>
      <BaseHeader />
      <Layout>
        <BaseMenu />
        <Content>
          <BaseTabs />
          <Suspense fallback={<Spin />}>
            <Card style={{ minHeight: "100vh" }}>
              <Outlet />
            </Card>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
