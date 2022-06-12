const defaultMenus:any[] =[
  {
    title:'首页',
    icon:'',
    path:'/'
  },
  {
    title:'用户管理',
    icon:'',
    path: "/user",
    children:[
      {
        title:'用户列表',
        path: "/user/list",
        icon:'',
      },{
        title:'用户添加',
        path: "/user/create",
        icon:'',
      }
    ]
  },{
    title:'菜单管理',
    icon:'',
    path: "/menu",
    children:[
      {
        title:'菜单列表',
        path: "/menu/list",
      },{
        title:'添加菜单',
        path: "/menu/create",
      }
    ]
  },{
    title:'角色管理',
    icon:'',
    path: "/role",
    children:[
      {
        title:'角色列表',
        path: "/role/list",
      }, {
        title:'添加角色',
        path: "/role/create",
      },
    ]
  },
  {
    title: '编辑器',
    icon: '',
    path: "/editor",
  }, {
    title: '日志',
    icon: '',
    path: "/logger",
  }
]

export default defaultMenus;
