//路由数据集

const routeLs:any =[
    {
      path:'/welcome',name:'welcome',src:'WelcomeView',
      children:[
        {path:'',compoentStr:'AboutView'},
        {path:'login',compoentStr:'LoginView'}
      ]
    },
    {path:'/about',name:'about',src:'AboutView',children:[]}
]


export default routeLs;