import { Card, ConfigProvider, Layout, Spin } from "antd";
import React, { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BaseHeader from "./BaseHeader";
import BaseMenu from "./BaseMenu";
// import BaseTabs from "@/layout/BaseTabs";
import { useSnapshot } from "valtio";
import zhCN from "antd/locale/zh_CN";
import state from "@/store/store";
import enUS from "antd/locale/en_US";

const { Content } = Layout;
const LayoutPage = () => {
  const { language, token, menus } = useSnapshot(state);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    } else {
      const flag = menus.find((item) => item.path == location.pathname);
      if (!flag) {
        navigate("/noPermission", { replace: true });
      }
    }
  }, [location.pathname]);
  return (
    <ConfigProvider locale={language == "zh_CN" ? zhCN : enUS}>
      <Layout>
        <BaseHeader />
        <Layout>
          <BaseMenu />
          <Content>
            {/* <BaseTabs /> */}
            <Suspense fallback={<Spin />}>
              <Card style={{ minHeight: "100vh" }}>
                <Outlet />
              </Card>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default LayoutPage;
