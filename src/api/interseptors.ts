import { AxiosInstance, AxiosRequestConfig } from "axios";

const setRequestParams = (config: AxiosRequestConfig) => {
  const params = config.params || {};

  config.params = Object.assign(params, {
    apikey: process.env.VUE_APP_API_KEY
  });
  return (config);
};

const interseptors = (axios: AxiosInstance) => {
  axios.interceptors.request.use(setRequestParams);
};

export default  interseptors;
