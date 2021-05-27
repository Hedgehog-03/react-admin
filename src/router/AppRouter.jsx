import routes from './routes';
import Login from '../components/login';
import Home from '../components/home'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';

function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/home" component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
