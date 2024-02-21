import { entryPoint, useRequest } from '@/api';
import { useMutation } from 'react-query';

export const useLogin = () => {
  const { executePost } = useRequest();
  const process = (data: {
    password: string;
    remember: boolean;
    username: string;
  }) => {
    return executePost({
      url: entryPoint.LOGIN,
      data,
    });
  };
  return useMutation(process);
};
