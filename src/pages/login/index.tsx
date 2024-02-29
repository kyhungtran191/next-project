/* eslint-disable import/newline-after-import */
/* eslint-disable newline-before-return */
import Head from 'next/head'
import { NextPage } from 'next'
import LoginPage from 'src/views/layout/pages/login'
import BlankLayout from 'src/views/layout/BlankLayout'
type TProps = {}
const Login: NextPage<TProps> = () => {
  return <LoginPage />
}
export default Login

Login.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>
Login.guestGuard = true
