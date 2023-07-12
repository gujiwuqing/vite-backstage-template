import { proxy, subscribe } from "valtio";
import { subscribeKey } from "valtio/utils";

const state = proxy({
  themeColor: "#1890ff",
  collapsed: false,
  activeKey: localStorage.getItem("activeKey") || "/",
  language: localStorage.getItem("language") || "zh_CN",
  token: localStorage.getItem("token") || "",
  menus: "",
  tabs: localStorage.getItem("tabs")
    ? JSON.parse(<string>localStorage.getItem("tabs"))
    : [],
  changeThemeColor: (value: string) => {
    state.themeColor = value;
  },
  changeLanguage: (value: string) => {
    state.language = value;
  },
  changeCollapsed: (value: boolean) => {
    state.collapsed = value;
  },
  changeActiveKey: (value: string) => {
    state.activeKey = value;
  },
  changeTabs: (value: string[]) => {
    if (state.tabs.includes(value)) return;
    state.tabs = value;
  },
  changeToken: (value: string) => {
    state.token = value;
  },
});
subscribeKey(state, "themeColor", (v) => {
  localStorage.setItem("themeColor", v);
});
subscribeKey(state, "collapsed", (v) => {
  localStorage.setItem("collapsed", String(v));
});
subscribeKey(state, "activeKey", (v) => {
  localStorage.setItem("activeKey", v);
});
subscribeKey(state, "token", (v) => {
  localStorage.setItem("token", v);
});

subscribeKey(state, "language", (v) => {
  localStorage.setItem("language", v);
});
subscribe(state, () => {
  localStorage.setItem("tabs", JSON.stringify(state.tabs));
});
export default state;
