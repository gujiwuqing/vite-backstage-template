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
  },
  {
    text: '编辑器',
    icon: '',
    path: "/editor",
  }
]

export default menus;
