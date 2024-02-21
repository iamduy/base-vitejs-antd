import { Layout } from 'antd';
import Authenticated from '../Authenticated';
import { Outlet } from 'react-router-dom';

const RootPage = () => {
  return (
    <Authenticated>
      <Layout>
        <Outlet />
      </Layout>
    </Authenticated>
  );
};

export default RootPage;
