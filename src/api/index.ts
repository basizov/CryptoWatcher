import { IAPICrypto } from "@/models/ICrypto";
import { AxiosResponse } from "axios";
import { IUrlParams } from "../models/IUrlParams";
import axios from "./axios";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string, params: URLSearchParams) => axios.get<T>(url, { params }).then(responseBody)
};

const Cryptos = {
  list: (params: URLSearchParams) => requests.get<IAPICrypto[]>('/pricemulti', params)
};

const agent = {
  Cryptos
};

export default  agent;
