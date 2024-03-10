import { Navigate, createBrowserRouter } from 'react-router-dom';
import NavLayout from './components/NavLayout';
import RouteError from './components/RouterError';
import ForwardRef from './pages/ForwardRef/ForwardRef';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavLayout />,
    children: [
      {
        errorElement: <RouteError />,
        children: [
          { index: true, element: <h1> Home</h1> },
          { path: 'custom-input', element: <ForwardRef /> },
          { path: '*', element: <Navigate to="/" /> },
        ],
      },
    ],
  },
]);

export default router;
