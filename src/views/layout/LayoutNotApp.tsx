/* eslint-disable import/newline-after-import */
import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import VerticalLayout from './VerticalLayout'
import HorizontalLayout from './HorizontalLayout'
import { useTheme } from '@mui/material'

export default function LayoutNotApp({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true)
  const theme = useTheme()
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <HorizontalLayout open={false} toggleDrawer={() => {}} isHideMenu={true}></HorizontalLayout>
      <Box
        component='main'
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Toolbar />
        <Container sx={{ mt: 4, mb: 4, backgroundColor: theme.palette.background.paper, width: '100vw' }}>
          {children}
        </Container>
      </Box>
    </Box>
  )
}
