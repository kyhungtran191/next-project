/* eslint-disable import/newline-after-import */
/* eslint-disable newline-before-return */
import Head from 'next/head'
import { NextPage } from 'next'
import LoginPage from 'src/views/layout/pages/login'
type TProps = {}
const Login: NextPage<TProps> = () => {
  // const theme = useTheme()
  return <LoginPage></LoginPage>
}
export default Login
