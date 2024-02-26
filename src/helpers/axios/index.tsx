import axios from 'axios'
import { BASE_URL, CONFIG_API } from 'src/configs/api'
import { clearLocalUserData, getLocalUserData } from '../storage'
import { jwtDecode } from 'jwt-decode'
import { NextRouter, useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import { UserDataType } from 'src/contexts/types'

const instanceAxios = axios.create({
  baseURL: BASE_URL
})

const handleRedirectLogin = (router: NextRouter, setUser: (data: UserDataType | null) => void) => {
  if (router.asPath !== '/') {
    console.log(router.asPath !== '/')
    router.replace({
      pathname: '/login',
      query: { returnUrl: router.asPath }
    })
  } else {
    router.replace('/login')
  }
  setUser(null)
  clearLocalUserData()
}

type TProps = {
  children: React.ReactNode
}
const AxiosInterceptor: React.FC<TProps> = ({ children }) => {
  const router = useRouter()

  const { accessToken, refreshToken } = getLocalUserData()

  const { setUser } = useAuth()

  instanceAxios.interceptors.request.use(async function (config) {
    if (accessToken) {
      const decoded: any = jwtDecode(accessToken)
      if (decoded.exp < Date.now() / 1000) {
        config.headers.authorization = `Bearer ${accessToken}`
        return config
      } else {
        if (refreshToken) {
          const decodedRF: any = jwtDecode(refreshToken)
          if (decodedRF.exp > Date.now() / 1000) {
            await axios
              .post(
                `${CONFIG_API.AUTH.INDEX}/refresh-token`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${refreshToken}`
                  }
                }
              )
              .then(res => {
                if (res.data.data.access_token) {
                  const newAccessToken = res.data.data.access_token
                  if (newAccessToken) {
                    config.headers.authorization = `Bearer ${newAccessToken}`
                  } else {
                    handleRedirectLogin(router, setUser)
                  }
                }
              })
              .catch(() => {
                handleRedirectLogin(router, setUser)
              })
          } else {
            handleRedirectLogin(router, setUser)
          }
        }
      }
    } else {
      handleRedirectLogin(router, setUser)
    }
    return config
  })
  instanceAxios.interceptors.response.use(response => {
    console.log(response)
    return response
  })
  return <>{children}</>
}

export default instanceAxios
export { AxiosInterceptor }
