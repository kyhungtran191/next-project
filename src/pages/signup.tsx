/* eslint-disable import/newline-after-import */
import { NextPage } from 'next'
import SignUpPage from 'src/views/layout/pages/signup'
interface IProps {}
const SignUp: NextPage<IProps> = () => {
  return <SignUpPage></SignUpPage>
}
export default SignUp
