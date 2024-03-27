import axios from "axios"
import {ResponseType} from "./todolist-api"

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  withCredentials: true,
})

export const authAPI = {
  login(data:LoginParamsType) {
    return instance.post<ResponseType< {userId: number} >>( `/auth/login`,data)
  },
  me() {
    return instance.get<ResponseType<{id: number, email: string, login: string}>>(`/auth/me`)
  },
  logout() {
    return instance.delete<ResponseType>(`/auth/login`)
  }
}
export type LoginParamsType = {
  email: string,
  password: string,
  rememberMe: boolean,
  // captcha: string | null
}