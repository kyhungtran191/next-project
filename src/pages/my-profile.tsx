import { NextPage } from 'next'
import React from 'react'
import LayoutNotApp from 'src/views/layout/LayoutNotApp'
import MyProfilePage from 'src/views/layout/pages/profile/MyProfilePage'

type TProps = {}
const Profile: NextPage<TProps> = () => {
  return <MyProfilePage></MyProfilePage>
}
export default Profile
Profile.getLayout = (page: React.ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>
Profile.authGuard = true
