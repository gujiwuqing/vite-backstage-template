import { MenusItemDTO } from "@/service/base";
import { proxy, subscribe } from "valtio";
import { subscribeKey } from "valtio/utils";
import { UserInfo } from "@/service/base";

type State = {
  themeColor: string; // 主题颜色
  collapsed: boolean; // 菜单是否收起
  activeKey: string; // 当前激活的tab
  language: string; // 语言
  token: string; // token
  menus: MenusItemDTO[]; // 菜单
  tabs: string[]; // tabs栏
  userInfo: UserInfo; // 用户信息
  changeThemeColor: (value: string) => void;
  changeUserInfo: (value: UserInfo) => void;
  changeLanguage: (value: string) => void;
  changeCollapsed: (value: boolean) => void;
  changeActiveKey: (value: string) => void;
  changeTabs: (value: string[]) => void;
  changeToken: (value: string) => void;
  changeMenus: (value: MenusItemDTO[]) => void;
};

const state = proxy<State>({
  themeColor: "#1890ff",
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(<string>localStorage.getItem("userInfo"))
    : {
        email: "",
        username: "",
        avatar: "",
        phone: "",
      },
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
  changeMenus: (value: MenusItemDTO[]) => {
    state.menus = value;
  },
  changeUserInfo: (value: UserInfo) => {
    state.userInfo = value;
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

subscribe(state, () => {
  localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
});

export default state;
