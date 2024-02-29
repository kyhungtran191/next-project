/* eslint-disable import/newline-after-import */
import { NextPage } from 'next'
import BlankLayout from 'src/views/layout/BlankLayout'
import SignUpPage from 'src/views/layout/pages/signup'

interface IProps {}
const ManagerSystem: NextPage<IProps> = () => {
  return <SignUpPage></SignUpPage>
}
export default ManagerSystem

// ManagerSystem.guestGuard = true
