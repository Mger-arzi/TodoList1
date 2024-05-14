import axios from "axios"
import { BaseResponseType } from "./todolist-api"

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  headers: {
    "API-KEY": "8b52d82b-411b-4078-b86b-2741990d2f24",
    "Authorization": "Bearer 0cd9c881-200e-4bb4-83d5-e97aab0e6f58"
}
})

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<BaseResponseType<{ userId: number }>>(`/auth/login`, data)
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