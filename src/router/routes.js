import Login from '../components/login';
import Home from '../components/home';

const routes = [
  {
    path: "/",
    exact: true,
    component: Login
  },
  {
    path: "/home",
    component: Home
  },
]
export default routes;