// ** Icon Imports
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import React from 'react'
import IconifyIcon from '../Icon'
import { useAuth } from 'src/hooks/useAuth'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'
import { toFullName } from 'src/utils'
import i18n from 'src/configs/i18n'
import { Badge, styled } from '@mui/material'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}))
type TProps = {}
const UserDropdown = (props: TProps) => {
  //@hook
  const router = useRouter()
  const { t } = useTranslation()

  //@state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { user, logout } = useAuth()
  const open = Boolean(anchorEl)

  //@handler
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={t('Account')}>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
              <Avatar sx={{ width: 32, height: 32 }}>
                {user?.avatar ? (
                  <Image src={user?.avatar || ' '} alt='user' width={32} height={32}></Image>
                ) : (
                  <IconifyIcon icon='ph:user'></IconifyIcon>
                )}
              </Avatar>
            </StyledBadge>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mx: 4, pb: 2, px: 2 }}>
          <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
            <Avatar sx={{ width: 32, height: 32 }}>
              {user?.avatar ? (
                <Image src={user?.avatar || ' '} alt='user' width={32} height={32}></Image>
              ) : (
                <IconifyIcon icon='ph:user'></IconifyIcon>
              )}
            </Avatar>
          </StyledBadge>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>
              {toFullName(
                user?.lastName as string,
                user?.middleName as string,
                user?.firstName as string,
                i18n.language
              )}
            </Typography>
            <Typography>{user?.role?.name}</Typography>
          </Box>
        </Box>
        <Divider></Divider>
        <MenuItem onClick={() => router.push(`${ROUTE_CONFIG.MY_PROFILE}`)}>
          <Avatar /> {t('My profile')}
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>{/* <PersonAdd fontSize='small' /> */}</ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push(ROUTE_CONFIG.CHANGE_PASSWORD)
            handleClose()
          }}
        >
          <ListItemIcon>{/* <Settings fontSize='small' /> */}</ListItemIcon>
          Change Password
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>{/* <Logout fontSize='small' /> */}</ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default UserDropdown
