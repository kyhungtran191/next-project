// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { registerAuthAsync } from './action'
import { type Action } from '@reduxjs/toolkit'
import { useEffect } from 'react'

interface DataParams {
  q: string
  role: string
  status: string
  currentPlan: string
}

export interface Redux {
  getState: any
  dispatch: Dispatch<any>
}
const initialState = {
  isLoading: false,
  isSuccess: true,
  isError: false,
  message: '',
  typeError: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetInitialState: state => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.message = ''
      state.typeError = ''
    }
  },
  extraReducers: builder => {
    builder.addCase(registerAuthAsync.pending, (state, action: Action) => {
      console.log(action)
      state.isLoading = true
    }),
      builder.addCase(registerAuthAsync.rejected, (state, action) => {
        console.log('rejected', action)
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = ''
        state.typeError = ''
      }),
      builder.addCase(registerAuthAsync.fulfilled, (state, action) => {
        console.log(action)
        state.isLoading = false
        state.isSuccess = !!action.payload?.data?.email
        state.isError = !action.payload?.data?.email
        state.message = action.payload?.message
        state.typeError = action.payload?.typeError
      })
  }
})

export const { resetInitialState } = authSlice.actions
export default authSlice.reducer
