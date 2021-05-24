import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ApiClient } from './api.interface';

@Injectable()
export class ApiService {
  private readonly authorsApi: ApiClient;
  private readonly booksApi: ApiClient;

  constructor() {
    this.authorsApi = this.createApiClient(
      'http://authors:8081/api/v1/authors',
    );
    this.booksApi = this.createApiClient('http://books:8082/api/v1/books');
  }

  public getAuthorsApi(): ApiClient {
    return this.authorsApi;
  }

  public getBooksApi(): ApiClient {
    return this.booksApi;
  }

  private createApiClient(baseURL = ''): ApiClient {
    return {
      get: (
        url,
        config: AxiosRequestConfig & { public: boolean },
      ): Promise<AxiosResponse> => axios.get(url, { ...config, baseURL }),
      post: (
        url,
        data,
        config: AxiosRequestConfig & { public: boolean },
      ): Promise<AxiosResponse> =>
        axios.post(url, data, { ...config, baseURL }),
      patch: (
        url,
        data,
        config: AxiosRequestConfig & { public: boolean },
      ): Promise<AxiosResponse> =>
        axios.patch(url, data, { ...config, baseURL }),
      put: (
        url,
        data,
        config: AxiosRequestConfig & { public: boolean },
      ): Promise<AxiosResponse> => axios.put(url, data, { ...config, baseURL }),
      delete: (
        url,
        data,
        config: AxiosRequestConfig & { public: boolean },
      ): Promise<AxiosResponse> =>
        axios.delete(url, { ...config, baseURL, data }),
    };
  }
}
