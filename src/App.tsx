import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import { ExceptionError } from './models/api.model';
import router from './routes/RouterProvider';
import './styles/global.scss';
import { Spin } from 'antd';
import { useLoading } from './stores';

const shouldRetryFunction = (failureCount: number, error: any) => {
  return failureCount < 2 && ExceptionError.A000 === error.response?.data.code;
};

function App() {
  const { loading } = useLoading();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: shouldRetryFunction,
        retryDelay: 2000,
        staleTime: 30000,
      },
      mutations: {
        retry: shouldRetryFunction,
        retryDelay: 2000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Spin spinning={loading}>
        <RouterProvider router={router} />
      </Spin>
    </QueryClientProvider>
  );
}

export default App;
