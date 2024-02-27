import { Avatar, Box, Button, Grid, Icon, IconButton, useTheme } from '@mui/material'
import { NextPage } from 'next'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import IconifyIcon from 'src/components/Icon'

type TProps = {}
const MyProfilePage = () => {
  //@State
  const [avatar, setAvatar] = useState('')

  //@Config
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <form autoComplete='off' noValidate>
      <Grid container>
        <Grid
          container
          item
          md={6}
          xs={12}
          sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}
        >
          <Box sx={{ height: '100%', width: '100%' }}>
            <Grid container spacing={4}>
              <Grid item md={12} xs={12}>
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    {avatar && (
                      <IconButton
                        sx={{
                          position: 'absolute',
                          bottom: -4,
                          right: -6,
                          zIndex: 2,
                          color: theme.palette.error.main
                        }}
                        edge='start'
                        color='inherit'
                        onClick={() => setAvatar('')}
                      >
                        <IconifyIcon icon='material-symbols-light:delete-outline' />
                      </IconButton>
                    )}
                    {avatar ? (
                      <Avatar src={avatar} sx={{ width: 100, height: 100 }}>
                        <IconifyIcon icon='ph:user-thin' fontSize={70} />
                      </Avatar>
                    ) : (
                      <Avatar sx={{ width: 100, height: 100 }}>
                        <IconifyIcon icon='ph:user-thin' fontSize={70} />
                      </Avatar>
                    )}
                  </Box>
                  {/* <WrapperFileUpload
                    uploadFunc={handleUploadAvatar}
                    objectAcceptFile={{
                      'image/jpeg': ['.jpg', '.jpeg'],
                      'image/png': ['.png']
                    }}
                  >
                    <Button variant='outlined' sx={{ width: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Icon icon='ph:camera-thin'></Icon>
                      {avatar ? t('Change_avatar') : t('Upload_avatar')}
                    </Button>
                  </WrapperFileUpload> */}
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                {/* <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      disabled
                      label={t('Email')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('Enter_your_email')}
                      error={Boolean(errors?.email)}
                      helperText={errors?.email?.message}
                    />
                  )}
                  name='email'
                /> */}
              </Grid>
              <Grid item md={6} xs={12}>
                {/* {!isDisabledRole && (
                  <Controller
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <div>
                        <label
                          style={{
                            fontSize: '13px',
                            marginBottom: '4px',
                            display: 'block',
                            color: errors?.role
                              ? theme.palette.error.main
                              : `rgba(${theme.palette.customColors.main}, 0.42)`
                          }}
                        >
                          {t('Role')} <span style={{ color: theme.palette.error.main }}>*</span>
                        </label>
                        <CustomSelect
                          fullWidth
                          onChange={onChange}
                          options={optionRoles}
                          error={Boolean(errors?.role)}
                          onBlur={onBlur}
                          value={value}
                          placeholder={t('Enter_your_role')}
                        />
                        {errors?.role?.message && (
                          <FormHelperText
                            sx={{
                              color: errors?.role
                                ? theme.palette.error.main
                                : `rgba(${theme.palette.customColors.main}, 0.42)`
                            }}
                          >
                            {errors?.role?.message}
                          </FormHelperText>
                        )}
                      </div>
                    )}
                    name='role'
                  />
                )} */}
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid container item md={6} xs={12} mt={{ md: 0, xs: 5 }}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              backgroundColor: theme.palette.background.paper,
              borderRadius: '15px',
              py: 5,
              px: 4
            }}
            marginLeft={{ md: 5, xs: 0 }}
          >
            <Grid container spacing={4}>
              <Grid item md={6} xs={12}>
                {/* <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      fullWidth
                      label={t('Full_name')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('Enter_your_full_name')}
                      error={Boolean(errors?.fullName)}
                      helperText={errors?.fullName?.message}
                    />
                  )}
                  name='fullName'
                /> */}
              </Grid>
              <Grid item md={6} xs={12}>
                {/* <Controller
                  control={control}
                  name='address'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      fullWidth
                      label={t('Address')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('Enter_your_address')}
                    />
                  )}
                /> */}
              </Grid>
              <Grid item md={6} xs={12}>
                {/* <Controller
                  name='city'
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Box>
                      <InputLabel
                        sx={{
                          fontSize: '13px',
                          marginBottom: '4px',
                          display: 'block',
                          color: errors?.city
                            ? theme.palette.error.main
                            : `rgba(${theme.palette.customColors.main}, 0.42)`
                        }}
                      >
                        {t('City')}
                      </InputLabel>
                      <CustomSelect
                        fullWidth
                        onChange={onChange}
                        options={optionCities}
                        error={Boolean(errors?.city)}
                        onBlur={onBlur}
                        value={value}
                        placeholder={t('Enter_your_city')}
                      />
                      {errors?.city?.message && (
                        <FormHelperText
                          sx={{
                            color: errors?.city
                              ? theme.palette.error.main
                              : `rgba(${theme.palette.customColors.main}, 0.42)`
                          }}
                        >
                          {errors?.city?.message}
                        </FormHelperText>
                      )}
                    </Box>
                  )}
                /> */}
              </Grid>
              <Grid item md={6} xs={12}>
                {/* <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('Phone_number')}
                      onChange={e => {
                        const numValue = e.target.value.replace(/\D/g, '')
                        onChange(numValue)
                      }}
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        minLength: 8
                      }}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('Enter_your_phone')}
                      error={Boolean(errors?.phoneNumber)}
                      helperText={errors?.phoneNumber?.message}
                    />
                  )}
                  name='phoneNumber'
                /> */}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
          {t('Update')}
        </Button>
      </Box>
    </form>
  )
}

export default MyProfilePage
