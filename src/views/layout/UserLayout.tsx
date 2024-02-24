/* eslint-disable import/newline-after-import */
import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import VerticalLayout from './VerticalLayout'
import HorizontalLayout from './HorizontalLayout'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <HorizontalLayout open={open} toggleDrawer={toggleDrawer}></HorizontalLayout>
      <VerticalLayout open={open} toggleDrawer={toggleDrawer}></VerticalLayout>
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
        <Container>{children}</Container>
      </Box>
    </Box>
  )
}
