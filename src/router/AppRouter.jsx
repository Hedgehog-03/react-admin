import routes from './routes';
import { withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

function AppRouter() {
  return renderRoutes(routes)
}

export default withRouter(AppRouter);
