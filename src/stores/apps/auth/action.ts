import { Dispatch, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { registerAuth } from 'src/services/auth'

// ** Add User
export const registerAuthAsync = createAsyncThunk('auth/register', async (data: any) => {
  const response = await registerAuth(data)
  if (response.data) {
    return response
  }
  return {
    data: null,
    message: response?.response?.data.message,
    typeError: response?.response.data?.typeError
  }
})
