import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainViews/index.vue'
import { compile } from '@vue/compiler-dom'
 /* 在 evm.d.ts中配置了declare module '@/router/routeLs/index.js' 忽略此报错*/
import routeLs from './routeLs' 
import { loginCheck } from '@/utils/router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/',name: 'root',component: MainView},

  ]
})

function hasNecessaryRoute(to:any) :boolean{
  return router.hasRoute(to.name)
}


function generateRoute(to:any):any{

  
  const routeRecordRaw:any = {
    path:to.fullPath,
    name:to.name,
    component: () =>import(`@/views/${routeLs.find((res:any)=>res.name==to.name)?.src}.vue`) ,
    children:[]
  }
  
  
  
  // 拿到路由的子路由
  let children:Array<any> = routeLs.find((res:any)=>{if(res.name==to.name){return res}}).children
  const components:any = routeLs.find((res:any)=>{if(res.name==to.name){return res}}).components
  
  const hasChildren:boolean = children.length>0?true:false
  if(hasChildren){
    children = children.filter((res:any)=>{
      res.component= () => import(`@/views/${res.compoentStr}.vue`) 
      return res
    })
    
    routeRecordRaw.children = children

  }


  
  return routeRecordRaw
}

router.beforeEach(async (to, from, next) => {
  console.log(loginCheck());
  
  if (!loginCheck()) {
    if (to.name != 'welcome') {
      to.name = 'welcome'
      to.path = '/welcome'
      // next({name:'welcome'})
    }
  }


  const index = to.path.substring(1).indexOf('/')
  const getRoute = routeLs.find((res:any)=>{
    if(index>-1){
      if(res.path == to.path.substring(0,index+1)){
        return res
      }
    }

    if(res.path==to.path){
      return res
    } 
  })
  if(!to.name){
    to.name = getRoute.name
  }






  if (!hasNecessaryRoute(to)) {
      
    to.fullPath = getRoute.path
    router.addRoute(generateRoute(to))
    // 触发重定向 return to.fullPath
    next({path:to.fullPath})
  }

  next()
})

export default router
