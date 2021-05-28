import AppRouter from './router/AppRouter.jsx';
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
