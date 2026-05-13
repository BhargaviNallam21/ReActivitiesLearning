import { createBrowserRouter } from 'react-router';
import App from '../layout/App.tsx';
import HomePage from '../../features/home/HomePage.tsx';
import ActivityForm from '../../features/Activities/Forms/ActivityForm.tsx';
import AppDashboard from '../../features/Activities/Dashboard/AppDashboard.tsx';
import ActivityDetail from '../../features/Activities/Details/ActivityDetail.tsx';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'activities',
        element: <AppDashboard />,
      },
      {
        path: 'activities/:id',
        element: <ActivityDetail />,
      },
      {
        path: 'createActivity',
        element: <ActivityForm key={'create activity'} />,
      },
      {
        path: 'manage/:id',
        element: <ActivityForm />,
      },
    ],
  },
]);

export default routes;
