export type TParamsGetAllRoles = {
  limit: number
  page: number
  search: string
}

export type TRegisterAuth = {
  email: string
  password: string
}
export type TChangePassword = {
  currentPassword: string
  newPassword: string
}
