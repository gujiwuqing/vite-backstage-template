const defaultMenus:any[] =[
  {
    label:'首页',
    icon:'',
    key:'/'
  },
  {
    label:'用户管理',
    icon:'',
    key: "/user",
    children:[
      {
        label:'用户列表',
        key: "/user/list",
        icon:'',
      },{
        label:'用户添加',
        key: "/user/create",
        icon:'',
      }
    ]
  },{
    label:'菜单管理',
    icon:'',
    key: "/menu",
    children:[
      {
        label:'菜单列表',
        key: "/menu/list",
      },{
        label:'添加菜单',
        key: "/menu/create",
      }
    ]
  },{
    label:'角色管理',
    icon:'',
    key: "/role",
    children:[
      {
        label:'角色列表',
        key: "/role/list",
      }, {
        label:'添加角色',
        key: "/role/create",
      },
    ]
  },
  {
    label: '编辑器',
    icon: '',
    key: "/editor",
  }, {
    label: '日志',
    icon: '',
    key: "/logger",
  }
]

export default defaultMenus;
