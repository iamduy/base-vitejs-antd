import { ResponseType } from 'axios';
import { QueryObserverResult } from 'react-query';

export interface ISort {
  key: string;
  value: string;
}

export interface IApiResponse<T> {
  items: T[];
  pageInfo: {
    total: number | null;
  };
}

export type RefetchFunction<TData = unknown, TError = unknown> = (options?: {
  throwOnError: boolean;
}) => Promise<QueryObserverResult<TData, TError>>;

export enum ExceptionError {
  B066 = 'B066',
  A000 = 'A000',
}

interface IBaseRequestOptions {
  url: string;
  responseType?: ResponseType;
  disableLoading?: boolean;
}

export interface IExecuteWithParams extends IBaseRequestOptions {
  params?: unknown;
}

export interface IExecuteWithData extends IBaseRequestOptions {
  data?: unknown;
}

export interface IExecuteWithFormData extends IBaseRequestOptions {
  formData?: unknown;
  config?: any;
}
