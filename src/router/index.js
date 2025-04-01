import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home1Viewe from '../views/Home1View.vue'
import LoginView from "@/views/LoginView.vue";
import LayoutView from "@/views/Layout.vue";
import RegisterView from "@/views/RegisterView.vue";
import BookView from "@/views/BookView.vue";
import TypeView from "@/views/TypeView.vue";
import CarsitesView from "@/views/CarsitesView";
import MaintenanceRequestView from "@/views/MaintenanceRequestView";
import ParkingSpaceView from "@/views/ParkingSpaceView";
import NoticeView from "@/views/NoticeView";
import AdminPaymentView from "@/views/AdminPaymentView";
import FrontView from "@/views/FrontView.vue";
import OwnerHouseView from "@/views/OwnerHouseView";
import OwnerParkingView from "@/views/OwnerParkingView";
import OwnerPaymentView from "@/views/OwnerPaymentView";
import PersonView from "@/views/Person.vue";
import OwnerMaintenaceView from "@/views/OwnerMaintenaceView";
import HouseView from "@/views/HouseView";
// import ChangePswd from "@/views/ChangePswd.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/',
    name: 'layout',
    redirect:'/home',
    component: LayoutView,
    children:[
      {
        path: 'home',
        name: 'home',
        component: HomeView
      },

      {
        path: 'admin',
        name: 'admin',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue')
      },
      {
        path: 'book',
        name: 'book',
        component: BookView
      },
      {
        path: 'type',
        name: 'type',
        component: TypeView
      },
      {
        path: 'castes',
        name: 'castes',
        component: CarsitesView
      },
      {
        path: 'maintenanceRequest',
        name: 'maintenanceRequest',
        component: MaintenanceRequestView
      },
      {
        path: 'parkingSpace',
        name: 'parkingSpace',
        component: ParkingSpaceView
      },
      {
        path: 'house',
        name: 'house',
        component: HouseView
      },
      {
        path: 'notice',
        name: 'notice',
        component: NoticeView
      },
      {
        path: 'adminPayment',
        name: 'adminPayment',
        component: AdminPaymentView
      },
    ]
  },
  {
    path: '/frontView',
    name: 'frontView',
    component: FrontView,
    children: [
      {
        path: 'ownerhome',
        name: 'ownerhome',
        component: Home1Viewe
      },
      {
        path: 'person',
        name: 'person',
        component: PersonView
      },

      {
        path: 'ownerParkingSpace',
        name: 'ownerParkingSpace',
        component: OwnerParkingView
      },
      {
        path: 'notice',
        name: 'notice',
        component: NoticeView
      },
      {
        path: 'ownerPayment',
        name: 'ownerPayment',
        component: OwnerPaymentView
      },
      {
        path: 'ownerMaintenace',
        name: 'ownerMaintenace',
        component: OwnerMaintenaceView
      },
      {
        path: 'ownerHouse',
        name: 'ownerHouse',
        component: OwnerHouseView
      },
    ]
  },

  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },

  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: LoginView
  // },
  // {
  //   path: '/',
  //   name: 'layout',
  //   redirect:'/home',
  //   component: LayoutView,
  //   children:[
  //     {
  //       path: 'home',
  //       name: 'home',
  //       component: HomeView
  //     },
  //
  //     {
  //       path: 'admin',
  //       name: 'admin',
  //       // route level code-splitting
  //       // this generates a separate chunk (about.[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue')
  //     },
  //     {
  //       path: 'book',
  //       name: 'book',
  //       component: BookView
  //     },
  //     {
  //       path: 'type',
  //       name: 'type',
  //       component: TypeView
  //     },
  //     {
  //       path: 'castes',
  //       name: 'castes',
  //       component: CarsitesView
  //     },
  //     {
  //       path: 'maintenanceRequest',
  //       name: 'maintenanceRequest',
  //       component: MaintenanceRequestView
  //     },
  //     {
  //       path: 'parkingSpace',
  //       name: 'parkingSpace',
  //       component: ParkingSpaceView
  //     },
  //     {
  //       path: 'house',
  //       name: 'house',
  //       component: HouseView
  //     },
  //     {
  //       path: 'notice',
  //       name: 'notice',
  //       component: NoticeView
  //     },
  //     {
  //       path: 'ownerPayment',
  //       name: 'ownerPayment',
  //       component: OwnerPaymentView
  //     },
  //     {
  //       path: 'ownerParkingSpace',
  //       name: 'ownerParkingSpace',
  //       component: OwnerParkingView
  //     },
  //     {
  //       path: 'ownerHouse',
  //       name: 'ownerHouse',
  //       component: OwnerHouseView
  //     },
  //     {
  //       path: 'adminPayment',
  //       name: 'adminPayment',
  //       component: AdminPaymentView
  //     },
  //     // {
  //     //   path: 'person',
  //     //   name: 'person',
  //     //   component: PersonView
  //     // },
  //     // {
  //     //   path: 'changePswd',
  //     //   name: 'changePswd',
  //     //   component: ChangePswd
  //     // },
  //
  //
  //
  //   ]
  // },
  // {
  //   path: '/frontView',
  //   name: 'frontView',
  //   component: FrontView
  // },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: RegisterView
  // },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


//鉴别用户权限放在前端校验不安全，需要配合后端使用jwt校验
//路由守卫，只有登录成功才能进入首页，不能直接输入local://8080就进去了
router.beforeEach((to,from,next)=>{
  const user=localStorage.getItem("user");
  if(!user && to.path!='/login' &&to.path!='/register'){  //若user为空并且去的不是登录页面，则跳转到登录页面
    return next("/login");
  }
  if (user) {
    const userRole = JSON.parse(user).role;
    if (userRole === "ROLE_USER") {
      if (to.path === '/' || to.path.startsWith('/layout') || to.path.startsWith('/book') || to.path.startsWith('/type') || to.path.startsWith('/castes') || to.path.startsWith('/maintenanceRequest') || to.path.startsWith('/parkingSpace') || to.path.startsWith('/house') || to.path.startsWith('/notice') || to.path.startsWith('/adminPayment')) {
        return next("/frontView");
      }
    }
  }
  next();  //user为不为空并且去的不是登录页面
})

export default router
