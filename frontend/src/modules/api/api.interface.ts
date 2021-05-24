import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiClientMethod {
  (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
}

export interface ApiClientMethodWithData {
  (
    url: string,
    data?: any,
    config?: AxiosRequestConfig & { public?: boolean },
  ): Promise<AxiosResponse<any>>;
}

export interface ApiClient {
  get: ApiClientMethod;
  post: ApiClientMethodWithData;
  patch: ApiClientMethodWithData;
  put: ApiClientMethodWithData;
  delete: ApiClientMethodWithData;
}

export type ApiResponse<T> = AxiosResponse<T>;
