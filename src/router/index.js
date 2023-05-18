import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    redirect: '/landing'
  },{
    path: '/landing',
    name: 'Landing',
    component: () => import('../views/login/LandingPage.vue')
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/LoginPage.vue')
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('../views/login/ForgetView.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/login/SignUp.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/login/ContactUs.vue')
  },
  {
    path: '/verification/:email', // Add the parameter ":email"
    name: 'verification',
    props: true,
    component: () => import('../views/login/VerificationOtp.vue'),
  }, 
  
  // admin
  {
    path: '/adminhome',
    name: 'AdminHome',
    component: () => import('../views/Admin/AdminHome.vue')
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: () => import('../views/Admin/PlanifyCalendar.vue')
  },
  {
    path: '/schedule/challenges',
    name: 'PlanifyChallenge',
    component: () => import('../views/Admin/PlanifyChallenge.vue')
  },

  // developer
  {
    path: '/developerhome',
    name: 'DeveloperHome',
    component: () => import('../views/Developer/DeveloperHome.vue')
  },
  {
    path: '/companyhome',
    name: 'CompanyHome',
    component: () => import('../views/Company/CompanyHome.vue')
  },{
    path: '/instructorhome',
    name: 'InstructorHome',
    component: () => import('../views/Instructor/InstructorHome.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
/* const role=store.getters.getAccount.role
if (role=='admin'){
  routes.push({
    path: '/',
    redirect: '/adminlanding'
  },);
}else{
  routes.push({
    path: '/',
    redirect: '/landing'
  },);
} */

export default router
