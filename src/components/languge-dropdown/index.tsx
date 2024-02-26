// ** Icon Imports

import React from 'react'
import IconifyIcon from '../Icon'
import { useAuth } from 'src/hooks/useAuth'
import { Button, IconButton, Popover, Typography, styled } from '@mui/material'
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
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        {LANGUAGE_OPTIONS.map((lang: { lang: string; value: string }) => (
          <StyledItemLanguage key={lang.value} onClick={() => handleOnChangeLang(lang.value)}>
            <Typography>{lang.lang}</Typography>
          </StyledItemLanguage>
        ))}
      </Popover>
    </React.Fragment>
  )
}

export default LanguageDropdown
