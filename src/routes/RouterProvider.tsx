import Dashboard from '@/components/pages/Dashboard';
import ErrorPage from '@/components/pages/Error';
import Login from '@/components/pages/Login';
import RootPage from '@/components/templates/RootLayout';
import { createBrowserRouter } from 'react-router-dom';
import { routes } from '.';

const router = createBrowserRouter(
  [
    {
      path: routes.login,
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: routes.root,
      element: <RootPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: routes.root,
          element: <Dashboard />,
          errorElement: <ErrorPage />,
        },
        {
          path: routes.dashboard,
          element: <Dashboard />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ],
  {
    future: {
      // Normalize `useNavigation()`/`useFetcher()` `formMethod` to uppercase
      v7_normalizeFormMethod: true,
    },
  }
);

export default router;
