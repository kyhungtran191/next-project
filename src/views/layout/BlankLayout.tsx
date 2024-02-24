import * as React from 'react'
import { styled } from '@mui/material/styles'
import { Box, BoxProps } from '@mui/material'

const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh'
}))

export default function BlankLayout({ children }: { children: React.ReactNode }) {
  return (
    <BlankLayoutWrapper>
      <Box sx={{ overflow: 'hidden', minHeight: '100vh' }}>{children}</Box>
    </BlankLayoutWrapper>
  )
}
