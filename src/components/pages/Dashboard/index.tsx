import { Repository } from '@/services';

const Dashboard = () => {
  return (
    <div>
      dashboard
      <button onClick={() => Repository.logout()}>logout</button>
    </div>
  );
};

export default Dashboard;
