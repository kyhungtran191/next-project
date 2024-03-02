import React from 'react'

export default function RoleList() {
  return <div>RoleList</div>
}
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/newline-after-import */
/* eslint-disable newline-before-return */
import { NextPage } from 'next'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { registerAuthAsync } from 'src/stores/apps/auth/action'
import { AppDispatch } from 'src/stores'
import { useRouter } from 'next/router'

type TProps = {}

export const RoleListPage: NextPage<TProps> = () => {
  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()

  //   useEffect(() => {
  //     if (message) {
  //       if (isError) {
  //         toast.error(message)
  //       } else if (isSuccess) {
  //         toast.success(message)
  //         router.push(ROUTE_CONFIG.LOGIN)
  //       }
  //       dispatch(resetInitialState())
  //     }
  //   }, [isSuccess, isError, message])

  return (
    <Box component='main' maxWidth='xs'>
      <h1>Role Page</h1>
    </Box>
  )
}
