import Login from '../components/Login';
import HomeMain from '../components/Home/Main';
import HomeInformation from '../components/Home/Information'
import HomeTrain from '../components/Home/Train';
import Performance from '../components/Home/Performance'
import Interview from '../components/Home/Interview'

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