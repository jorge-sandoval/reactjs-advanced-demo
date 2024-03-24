import { Navigate, createBrowserRouter } from 'react-router-dom';
import NavLayout from './components/NavLayout';
import RouteError from './components/RouterError';
import ForwardRef from './pages/ForwardRef/ForwardRef';
import Portals from './pages/Portals/Portals';
import DatePickerPage from './pages/DatePicker';
import TooltipPage from './pages/Tooltip';
import InfiniteScrollPage from './pages/InfiniteScroll/InfiniteScrollPage';
import CalendarPage from './pages/Calendar/CalendarPage';
import CalendarContextProvider from './context/calendarContextProvider';

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
          { path: 'modals', element: <Portals /> },
          { path: 'date-picker', element: <DatePickerPage /> },
          { path: 'tooltip', element: <TooltipPage /> },
          { path: 'infinite-scroll', element: <InfiniteScrollPage /> },
          {
            path: 'calendar',
            element: (
              <CalendarContextProvider>
                <CalendarPage />
              </CalendarContextProvider>
            ),
          },
          { path: '*', element: <Navigate to="/" /> },
        ],
      },
    ],
  },
]);

export default router;
