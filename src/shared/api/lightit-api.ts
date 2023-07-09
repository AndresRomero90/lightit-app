import axios, { RawAxiosRequestHeaders } from 'axios';

export const apiInstance = (accessToken?: string) => {
  const headers: RawAxiosRequestHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (accessToken && accessToken !== '') {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API as string,
    headers,
  });
};
