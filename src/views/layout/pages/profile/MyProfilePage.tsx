import { yupResolver } from '@hookform/resolvers/yup'
import { FormHelperText, InputLabel } from '@mui/material'
import { Avatar, Box, Button, Grid, IconButton, useTheme } from '@mui/material'
import { t } from 'i18next'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import IconifyIcon from 'src/components/Icon'
import CustomSelect from 'src/components/custom-select'
import Spinner from 'src/components/spinner'
import CustomTextField from 'src/components/text-field'
import WrapperFileUpload from 'src/components/wrapper-file-upload'
import { EMAIL_REG } from 'src/configs/regex'

import { getAuthMe } from 'src/services/auth'
import { AppDispatch, RootState } from 'src/stores'
import { resetInitialState } from 'src/stores/auth'
import { updateAuthMeAsync } from 'src/stores/auth/action'
import { convertBase64, separationFullName, toFullName } from 'src/utils'
import * as yup from 'yup'

type TDefaultValue = {
  email: string
  address: string
  city: string
  phoneNumber: string
  role: string
  fullName: string
}

const defaultValues: TDefaultValue = {
  email: '',
  address: '',
  city: '',
  phoneNumber: '',
  role: '',
  fullName: ''
}

const MyProfilePage = () => {
  //@State
  const [avatar, setAvatar] = useState('')
  const [loading, setLoading] = useState(false)
  const [isDisabledRole, setIsDisabledRole] = useState(false)
  const [optionRoles, setOptionRoles] = useState<{ label: string; value: string }[]>([])
  const [optionCities, setOptionCities] = useState<{ label: string; value: string }[]>([])
  const [roleID, setRoleID] = useState('')

  //@Hooks
  const router = useRouter()
  const { i18n } = useTranslation()
  const dispatch: AppDispatch = useDispatch()
  const { isErrorUpdateMe, isLoading, isSuccessUpdateMe, messageUpdateMe, typeError } = useSelector(
    (state: RootState) => state.auth
  )

  //@Config
  const theme = useTheme()
  const schema = yup.object().shape({
    email: yup.string().required('Required_field').matches(EMAIL_REG, 'The field is must email type'),
    fullName: yup.string().notRequired(),
    phoneNumber: yup.string().required('Required_field').min(9, 'The phone number is min 9 number'),
    role: yup.string().required('Required_field'),
    city: yup.string().notRequired(),
    address: yup.string().notRequired()
  })

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const handleUploadAvatar = async (file: File) => {
    const base64 = await convertBase64(file)
    setAvatar(base64 as string)
  }

  const fetchGetAuthMe = async () => {
    setLoading(true)
    await getAuthMe()
      .then(async response => {
        setLoading(false)
        if (response.data) {
          const userData = response.data
          setRoleID(userData?.role?.id)
          setAvatar(userData?.avatar || '')
          reset({
            email: userData?.email,
            address: '',
            city: ' ',
            phoneNumber: userData.phoneNumber,
            fullName: toFullName(userData?.lastName, userData?.middleName, userData?.firstName, i18n.language),
            role: userData?.role?.name
          })
        }
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
        if (!router.pathname.includes('login')) {
          router.replace('/login')
          console.log(1)
        }
      })
  }

  useEffect(() => {
    if (messageUpdateMe) {
      if (isErrorUpdateMe) {
        toast.error(messageUpdateMe)
      } else if (isSuccessUpdateMe) {
        toast.success(messageUpdateMe)
        fetchGetAuthMe()
      }
      dispatch(resetInitialState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessUpdateMe, isErrorUpdateMe, messageUpdateMe])

  useEffect(() => {
    fetchGetAuthMe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

  function handleSubmitForm(data: any) {
    const { firstName, lastName, middleName } = separationFullName(data.fullName, i18n.language)
    dispatch(
      updateAuthMeAsync({
        email: data.email,
        firstName,
        lastName,
        middleName,
        role: roleID,
        phoneNumber: data.phoneNumber,
        avatar: avatar,
        address: data.address
      })
    )
  }
  return (
    <>
      {(loading || isLoading) && <Spinner></Spinner>}
      <form autoComplete='off' noValidate onSubmit={handleSubmit(handleSubmitForm)}>
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
                    <WrapperFileUpload
                      uploadFunc={handleUploadAvatar}
                      objectAcceptFile={{
                        'image/jpeg': ['.jpg', '.jpeg'],
                        'image/png': ['.png']
                      }}
                    >
                      <Button variant='outlined' sx={{ width: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconifyIcon icon='ph:camera-thin'></IconifyIcon>
                        {avatar ? 'Change_avatar' : 'Upload_avatar'}
                      </Button>
                    </WrapperFileUpload>
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
                        required
                        fullWidth
                        label={'Email'}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        disabled
                        placeholder={'Enter_your_email'}
                        error={Boolean(errors?.email)}
                        helperText={errors?.email?.message}
                      />
                    )}
                    name='email'
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  {!isDisabledRole && (
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
                  )}
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
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
                        fullWidth
                        label={'Full_name'}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder={'Enter_your_full_name'}
                        error={Boolean(errors?.fullName)}
                        helperText={errors?.fullName?.message}
                      />
                    )}
                    name='fullName'
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name='address'
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
                        fullWidth
                        label={'Address'}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder={'Enter_your_address'}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Controller
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
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
                        required
                        fullWidth
                        label={'Phone_number'}
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
                        placeholder={'Enter_your_phone'}
                        error={Boolean(errors?.phoneNumber)}
                        helperText={errors?.phoneNumber?.message}
                      />
                    )}
                    name='phoneNumber'
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
            {'Update'}
          </Button>
        </Box>
      </form>
    </>
  )
}

export default MyProfilePage
