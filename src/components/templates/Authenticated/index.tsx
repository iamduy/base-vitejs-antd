import { routes } from '@/routes';
import { Repository } from '@/services';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type AuthenticateProps = {
  children?: React.ReactNode;
};

const Authenticate = (props: AuthenticateProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const handleAuthenticate = async () => {
    const isLogin = Repository.isLogin();
    const pathName = location.pathname;

    if (!isLogin) {
      if (pathName === routes.login) {
        setIsReady(true);
        return;
      }
      navigate(routes.login, { replace: true });
    } else {
      if (pathName !== routes.login) {
        setIsReady(true);
        return;
      }
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    handleAuthenticate();
    window.addEventListener('storage', handleAuthenticate);
  });

  return <div>{isReady && props.children}</div>;
};

export default Authenticate;
