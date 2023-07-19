const defaultMenus: any[] = [
  {
    label: "仪表盘",
    icon: "",
    key: "/",
  },
  {
    label: "系统管理",
    icon: "",
    key: "/system",
    children: [
      {
        label: "用户管理",
        key: "/system/user",
        icon: "",
      },
      {
        label: "角色管理",
        key: "/system/role",
      },
      {
        label: "菜单管理",
        key: "/system/menu",
      },
    ],
  },

  {
    label: "常用组件",
    icon: "",
    key: "/common",
    children: [
      {
        label: "引导组件",
        key: "/common/tour",
      },
      {
        label: "水印组件",
        key: "/common/watermark",
      },
    ],
  },
  {
    label: "Echarts",
    icon: "",
    key: "/echarts",
    children: [
      {
        label: "折线图",
        key: "/echarts/line",
      },
      {
        label: "柱状图",
        key: "/echarts/area",
      },
      {
        label: "雷达图",
        key: "/echarts/radar",
      },
      {
        label: "树形图",
        key: "/echarts/tree",
      },
    ],
  },
  {
    label: "编辑器",
    icon: "",
    key: "/editor",
  },
  {
    label: "日志",
    icon: "",
    key: "/logger",
  },
];

export default defaultMenus;
