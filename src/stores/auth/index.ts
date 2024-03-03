// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import { changePasswordMeAsync, registerAuthAsync, updateAuthMeAsync } from './action'
import { type Action } from '@reduxjs/toolkit'

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
  typeError: '',
  isSuccessUpdateMe: true,
  isErrorUpdateMe: false,
  messageUpdateMe: '',
  isErrorChangePassword: false,
  isSuccessChangePassword: false,
  messageChangePassword: ''
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
      state.isSuccessUpdateMe = true
      state.isErrorUpdateMe = false
      state.messageUpdateMe = ''
      state.isErrorChangePassword = false
      state.isSuccessChangePassword = false
      state.messageChangePassword = ''
    }
  },
  extraReducers: builder => {
    /**Register */
    builder.addCase(registerAuthAsync.pending, (state, action: Action) => {
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

    /**Update me */
    builder.addCase(updateAuthMeAsync.pending, (state, action: Action) => {
      state.isLoading = true
    }),
      builder.addCase(updateAuthMeAsync.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccessUpdateMe = false
        state.isErrorUpdateMe = true
        state.messageUpdateMe = ''
        state.typeError = ''
      }),
      builder.addCase(updateAuthMeAsync.fulfilled, (state, action) => {
        state.typeError = ''
        state.isLoading = false
        state.isSuccessUpdateMe = false
        state.isErrorUpdateMe = false
        state.messageUpdateMe = ''
      })

    // ** change password me
    builder.addCase(changePasswordMeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(changePasswordMeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessChangePassword = !!action.payload?.data
      state.isErrorChangePassword = !action.payload?.data
      state.messageChangePassword = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(changePasswordMeAsync.rejected, (state, action) => {
      state.isLoading = false
      state.typeError = ''
      state.isSuccessChangePassword = false
      state.isErrorChangePassword = false
      state.messageChangePassword = ''
    })
  }
})

export const { resetInitialState } = authSlice.actions
export default authSlice.reducer
