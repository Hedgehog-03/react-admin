import Login from '../components/login';
import HomeMain from '../components/home/main';
import HomeInformation from '../components/home/information'
import HomeTrain from '../components/home/train';
import Performance from '../components/home/performance'
import Interview from '../components/home/interview'

const routes = [
  {
    path: "/login",
    exact: true,
    component: Login,
  },
  {
    path: "/home",
    component: HomeMain,
    routes: [
      {
        path: "/home/information",
        exact: true,
        component: HomeInformation,
      },
      {
        path: "/home/train",
        component: HomeTrain,
      },
      {
        path: "/home/performance",
        component: Performance,
      },
      {
        path: "/home/interview",
        component: Interview,
      },
    ]
  },
]
export default routes;