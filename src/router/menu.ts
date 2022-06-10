const menus:any[] =[
  {
    text:'首页',
    icon:'',
    path:'/'
  },
  {
    text:'用户管理',
    icon:'',
    path: "/user",
    children:[
      {
        text:'用户列表',
        path: "/user/list",
        icon:'',
      }
    ]
  },{
    text:'菜单管理',
    icon:'',
    path: "/menu",
    children:[
      {
        text:'菜单列表',
        path: "/menu/list",
      },{
        text:'添加菜单',
        path: "/menu/create",
      }
    ]
  },{
    text:'角色管理',
    icon:'',
    path: "/role",
    children:[
      {
        text:'角色列表',
        path: "/role/list",
      }, {
        text:'添加角色',
        path: "/role/create",
      },
    ]
  },
  {
    text: '编辑器',
    icon: '',
    path: "/editor",
  }, {
    text: '日志',
    icon: '',
    path: "/logger",
  }
]

export default menus;
