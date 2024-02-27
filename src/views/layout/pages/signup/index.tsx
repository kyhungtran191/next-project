/* eslint-disable import/newline-after-import */
/* eslint-disable newline-before-return */
import { NextPage } from 'next'
import Link from 'next/link'
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Typography,
  Container,
  useTheme,
  IconButton
} from '@mui/material'
import CustomTextField from 'src/components/text-field'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import { useState } from 'react'
import Image from 'next/image'
import FacebookSVG from '/public/svgs/facebook.svg'
import GoogleSVG from '/public/svgs/google.svg'
type TProps = {}
const schema = yup
  .object()
  .shape({
    email: yup.string().required().matches(EMAIL_REG, 'Email is not valid'),
    password: yup
      .string()
      .required()
      .matches(PASSWORD_REG, 'Password must contain character, special character,number'),
    confirm_password: yup
      .string()
      .required()
      .matches(PASSWORD_REG, 'Confirm password must contain character, special')
      .oneOf([yup.ref('password')], 'Confirm Password not match')
  })
  .required()

const SignUpPage: NextPage<TProps> = () => {
  const theme = useTheme()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirm_password: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const onSubmit = (data: { email: string; password: string; confirm_password: string }) => {}
  return (
    <Box component='main' maxWidth='xs'>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          padding: '40px'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <CssBaseline></CssBaseline>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography component='h1' variant='h5'>
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
              <Box sx={{ mt: 2, width: '300px' }}>
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      required
                      fullWidth
                      id='email'
                      label='Email*'
                      autoComplete='email'
                      placeholder='Input email'
                      autoFocus
                      error={Boolean(errors.email)}
                      {...field}
                    />
                  )}
                />
                {errors.email && <Typography color={'red'}>{errors.email.message}</Typography>}
              </Box>
              <Box sx={{ mt: 2, width: '300px' }}>
                <Controller
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label='Password'
                      type='password'
                      placeholder='Input Password'
                      id='password'
                      error={Boolean(errors.password)}
                      autoComplete='current-password'
                      {...field}
                    />
                  )}
                />
                {errors.password && <Typography color={'red'}>{errors.password.message}</Typography>}
              </Box>
              <Box sx={{ mt: 2, width: '300px' }}>
                <Controller
                  name='confirm_password'
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      required
                      fullWidth
                      id='confirm_password'
                      label='Confirm_password*'
                      placeholder='Confirm_password'
                      autoFocus
                      type='password'
                      error={Boolean(errors.confirm_password)}
                      {...field}
                    />
                  )}
                />
                {errors.confirm_password && <Typography color={'red'}>{errors.confirm_password.message}</Typography>}
              </Box>
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  Have account?{' '}
                </Grid>
                <Grid item>
                  <Link href='/login'>Login</Link>
                </Grid>
              </Grid>
              <Typography sx={{ textAlign: 'center', mt: 2, mb: 2 }}>Or</Typography>
              <Box>
                <IconButton sx={{ color: theme.palette.error.main }}>
                  <Image src={FacebookSVG} style={{ height: '40px', width: '40px' }} alt='Facebook'></Image>
                </IconButton>
                <IconButton sx={{ color: theme.palette.error.main }}>
                  <Image src={GoogleSVG} style={{ height: '40px', width: '40px' }} alt='Facebook'></Image>
                </IconButton>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default SignUpPage
