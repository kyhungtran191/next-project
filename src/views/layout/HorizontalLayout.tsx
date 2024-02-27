import * as React from 'react'
import { styled } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import IconifyIcon from 'src/components/Icon'
import UserDropdown from 'src/components/user-dropdown'
import LanguageDropdown from 'src/components/languge-dropdown'
import { useAuth } from 'src/hooks/useAuth'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

export default function HorizontalLayout({
  open,
  toggleDrawer,
  isHideMenu = false
}: {
  open: boolean
  toggleDrawer: () => void
  isHideMenu: boolean
}) {
  
  //@Hooks
  const { user } = useAuth()

  //@Router
  const router = useRouter()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='absolute' open={open}>
        <Toolbar
          sx={{
            pr: '30px',
            margin: '0 20px' // keep right padding when drawer closed
          }}
        >
          {!isHideMenu && (
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' })
              }}
            >
              <IconifyIcon icon={'ic:sharp-menu'} />
            </IconButton>
          )}

          <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <LanguageDropdown></LanguageDropdown>
          {user ? (
            <UserDropdown></UserDropdown>
          ) : (
            <Button
              type='submit'
              variant='contained'
              sx={{ width: 'auto', backgroundColor: 'white', color: 'black' }}
              onClick={() => router.push('/login')}
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
