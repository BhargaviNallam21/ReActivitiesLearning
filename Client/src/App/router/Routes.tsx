import { createBrowserRouter, Navigate } from 'react-router';
import App from '../layout/App.tsx';
import HomePage from '../../features/home/HomePage.tsx';
import ActivityForm from '../../features/Activities/Forms/ActivityForm.tsx';
import AppDashboard from '../../features/Activities/Dashboard/AppDashboard.tsx';
import Counter from '../../features/counter/Counter.tsx';
import ActivityDetailPage from '../../features/Activities/Details/ActivityDetailPage.tsx';
import TestErrors from '../../features/errors/TestError.tsx';
import NotFound from '../../features/errors/NotFound.tsx';
import ServerError from '../../features/errors/ServerError.tsx';

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
        element: <ActivityDetailPage />,
      },
      {
        path: 'createActivity',
        element: <ActivityForm key={'create activity'} />,
      },
      {
        path: 'manage/:id',
        element: <ActivityForm />,
      },
      {
        path: 'counter',
        element: <Counter />,
      },
      {
        path: 'test-errors',
        element: <TestErrors />,
      },
      {
        path: 'not-found',
        element: <NotFound />,
      },
      {
        path: 'server-error',
        element: <ServerError />,
      },
      {
        path: '*',
        element: <Navigate replace to="/not-found" />,
      },
    ],
  },
]);

export default routes;
