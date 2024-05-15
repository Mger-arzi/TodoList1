export enum ResultCode {
  success = 0,
  error = 1
}
export type FieldErrorType = {
  error: string
  field: string
}
export type BaseResponseType<D = {}> = {
  resultCode: 0
  fieldsErrors: FieldErrorType[]
  messages: string[],
  data: D
}