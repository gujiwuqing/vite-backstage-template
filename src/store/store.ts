import { MenuItemDTO } from "@/service/base";
import { proxy, subscribe } from "valtio";
import { subscribeKey } from "valtio/utils";

type State = {
  themeColor: string;
  collapsed: boolean;
  activeKey: string;
  language: string;
  token: string;
  menus: MenuItemDTO[];
  tabs: string[];
  changeThemeColor: (value: string) => void;
  changeLanguage: (value: string) => void;
  changeCollapsed: (value: boolean) => void;
  changeActiveKey: (value: string) => void;
  changeTabs: (value: string[]) => void;
  changeToken: (value: string) => void;
  changeMenus: (value: MenuItemDTO[]) => void;
};

const state = proxy<State>({
  themeColor: "#1890ff",
  collapsed: false,
  activeKey: localStorage.getItem("activeKey") || "/",
  language: localStorage.getItem("language") || "zh_CN",
  token: localStorage.getItem("token") || "",
  menus: localStorage.getItem("token")
    ? JSON.parse(<string>localStorage.getItem("menus"))
    : [],
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
    state.tabs = value;
  },
  changeToken: (value: string) => {
    state.token = value;
  },
  changeMenus: (value: MenuItemDTO[]) => {
    state.menus = value;
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
  localStorage.setItem("menus", JSON.stringify(state.menus));
});
subscribe(state, () => {
  localStorage.setItem("tabs", JSON.stringify(state.tabs));
});
export default state;
