/* eslint-disable newline-before-return */
'use client'
import { Box, useTheme } from '@mui/material'
import Head from 'next/head'
import CustomTextField from 'src/components/text-field'
import { useSettings } from 'src/hooks/useSettings'

export default function Home() {
  // const theme = useTheme()
  const settings = useSettings()
  console.log(settings)
  return (
    <>
      <Head>
        {/* <title>Lập trình thật dễ</title> */}
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </>
  )
}
