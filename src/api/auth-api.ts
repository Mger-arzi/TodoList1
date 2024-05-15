import axios from "axios"
import { BaseResponseType } from "types/types"

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  withCredentials: true,
  headers: {
    "API-KEY": "8b52d82b-411b-4078-b86b-2741990d2f24",
  }
})
instance.interceptors.request.use(function (config) {
  config.headers["Authorization"] = "Bearer " + localStorage.getItem("sn-token");

  return config;
});

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<BaseResponseType<{ userId: number , token: string}>>(`/auth/login`, data)
  },
  me() {
    return instance.get<BaseResponseType<{ id: number, email: string, login: string }>>(`/auth/me`)
  },
  logout() {
    return instance.delete<BaseResponseType>(`/auth/login`)
  }
}
export type LoginParamsType = {
  email: string,
  password: string,
  rememberMe: boolean,
  // captcha: string | null
}