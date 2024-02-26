import { REFRESH_TOKEN, USER_DATA } from 'src/configs/auth'

export const setLocalUserData = (userData: string, accessToken: string, refreshToken: string) => {
  return {
    userData: window.localStorage.setItem(USER_DATA, userData),
    refreshToken: window.localStorage.setItem(REFRESH_TOKEN, refreshToken),
    accessToken: window.localStorage.setItem(REFRESH_TOKEN, accessToken)
  }
}

export const getLocalUserData = () => {
  return {
    userData: window.localStorage.getItem(USER_DATA),
    refreshToken: window.localStorage.getItem(REFRESH_TOKEN),
    accessToken: window.localStorage.getItem(REFRESH_TOKEN)
  }
}

export const clearLocalUserData = () => {
  window.localStorage.removeItem(USER_DATA)
  window.localStorage.removeItem(REFRESH_TOKEN)
  window.localStorage.removeItem(REFRESH_TOKEN)
}
