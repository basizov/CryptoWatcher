import { AxiosResponse } from "axios";
import axios from "./axios";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody)
};

const agent = {

};

export default  agent;
