import Login from '../components/login';
import HomeMain from '../components/home/main';
import HomeIndex from '../components/home/index'
import Train from '../components/home/admin/train';

const routes = [
  {
    path: "/",
    exact: true,
    component: Login
  },
  {
    path: "/home",
    component: HomeMain,
    routes: [
      {
        path: "/home/index",
        exact: true,
        component: HomeIndex
      },
      {
        path: "/home/train",
        component: Train
      }
    ]
  },
  
]
export default routes;