import axios from "axios";
import { setupInterceptorsTo } from "./interceptors";

export const request = setupInterceptorsTo(
  axios.create({
    timeout: 90000,
  })
);
export default request;
