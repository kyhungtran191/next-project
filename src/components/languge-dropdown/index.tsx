// ** Icon Imports

import React from 'react'
import IconifyIcon from '../Icon'
import { useAuth } from 'src/hooks/useAuth'
import { IconButton, Menu, MenuItem, styled } from '@mui/material'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { LANGUAGE_OPTIONS } from 'src/configs/i18n'

type TProps = {}

const StyledItemLanguage = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  '.MuiTypography-root': {
    padding: '8px 12px'
  },
  '&:hover': {
    backgroundColor: 'red'
  }
}))

const LanguageDropdown = (props: TProps) => {
  /**State */
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const { i18n } = useTranslation()
  console.log('i18n', i18n)

  const handleOnChangeLang = (lang: string) => {
    i18n.changeLanguage(lang)
    handleClose()
  }

  return (
    <React.Fragment>
      <IconButton onClick={handleOpen}>
        <IconifyIcon icon='ic:baseline-translate'></IconifyIcon>
      </IconButton>
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
        {LANGUAGE_OPTIONS.map(lang => (
          <MenuItem
            selected={lang.value === i18n.language}
            onClick={() => handleOnChangeLang(lang.value)}
            key={lang.value}
          >
            {lang.lang}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  )
}

export default LanguageDropdown
