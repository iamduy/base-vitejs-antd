import {
  ExceptionError,
  IExecuteWithData,
  IExecuteWithFormData,
  IExecuteWithParams,
} from '@/models/api.model';
import { private_path } from '@/routes';
import { AuthHelper, Repository } from '@/services';
import { useLoading } from '@/stores';
import { message } from 'antd';
import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 2 * 60 * 1000,
});

let requestInterceptor: number;
let responseInterceptor: number;
let isRefreshing = false;

export const useRequest = () => {
  const { setLoading } = useLoading();
  if (!!requestInterceptor || requestInterceptor === 0) {
    instance.interceptors.request.eject(requestInterceptor);
  }

  if (!!responseInterceptor || responseInterceptor === 0) {
    instance.interceptors.response.eject(responseInterceptor);
  }

  requestInterceptor = instance.interceptors.request.use(
    (config) => {
      console.log('config', config);
      config.headers.Authorization = AuthHelper.getAuthToken();
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  responseInterceptor = instance.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    async (error) => {
      if (ExceptionError.A000 === error.response?.data.code) {
        Repository.logout();
      }
      if (
        error.response.status === 401 &&
        !isRefreshing &&
        private_path.includes(location.pathname)
      ) {
        isRefreshing = true;
        // getNewRefreshToken()
        //   .then((res) => {
        //     setAccessToken(res.data.accessToken);
        //     setRefreshToken(res.data.refreshToken);
        //   })
        //   .catch((err) => {
        //     if (err.response.data.code === "A012") {
        //       if (isAccessTokenExpired()) {
        //         logout();
        //       } else {
        //         // console.log("access token was refresh");
        //       }
        //     } else {
        //       logout();
        //     }
        //   })
        //   .finally(() => {
        //     isRefreshing = false;
        //   });
      } else {
        if (!isRefreshing) {
          message.error(error.response?.data.code);
        }
      }
      return Promise.reject(error);
    }
  );

  // const getNewRefreshToken = async () => {
  //   const refreshToken = getRefreshToken();
  //   return axios({
  //     method: "post",
  //     headers: {
  //       Authorization: `Bearer ${getAccessToken()}`,
  //     },
  //     url: process.env.NEXT_PUBLIC_BASE_API_URL + endPoint.REFRESH,
  //     data: { refreshToken },
  //   });
  // };

  const executeGet = async <T>({
    url,
    params,
    responseType,
    disableLoading = false,
  }: IExecuteWithParams) => {
    !disableLoading && setLoading(true);
    return instance
      .get<T>(url, { params, responseType })
      .then((res) => res.data);
  };

  const executePost = ({
    url,
    data,
    responseType,
    disableLoading = false,
  }: IExecuteWithData) => {
    !disableLoading && setLoading(true);
    return instance({
      method: 'POST',
      url,
      data,
      responseType,
    });
  };

  const executePatch = ({
    url,
    data,
    responseType,
    disableLoading = false,
  }: IExecuteWithData) => {
    !disableLoading && setLoading(true);
    return instance({
      method: 'PATCH',
      url,
      data,
      responseType,
    });
  };

  const executePut = ({
    url,
    data,
    responseType,
    disableLoading = false,
  }: IExecuteWithData) => {
    !disableLoading && setLoading(true);
    return instance({
      method: 'PUT',
      url,
      data,
      responseType,
    });
  };

  const executeDelete = ({
    url,
    params,
    responseType,
    disableLoading = false,
  }: IExecuteWithParams) => {
    !disableLoading && setLoading(true);
    return instance({
      method: 'DELETE',
      url,
      params,
      responseType,
    });
  };

  const executePostFile = ({
    url,
    formData,
    config,
    disableLoading = false,
  }: IExecuteWithFormData) => {
    !disableLoading && setLoading(true);
    return instance.post(url, formData, config);
  };

  return {
    executeGet,
    executePost,
    executePatch,
    executePut,
    executeDelete,
    executePostFile,
  };
};
