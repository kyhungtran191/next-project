// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { type Action } from '@reduxjs/toolkit'
import { getAllRolesAsync } from './action'

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
  messageChangePassword: '',
  roles: {
    data: [],
    total: 0
  }
}

export const roleSlice = createSlice({
  name: 'role',
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
    builder.addCase(getAllRolesAsync.pending, (state, action: Action) => {
      state.isLoading = true
    }),
      builder.addCase(getAllRolesAsync.rejected, (state, action) => {
        state.isLoading = false
        state.roles.data = []
      }),
      builder.addCase(getAllRolesAsync.fulfilled, (state, action) => {
        console.log(action)
        state.isLoading = false
        state.isLoading = false
        state.roles.data = action.payload.data.roles
        state.roles.total = action.payload.data.totalCount
      })
  }
})

export const { resetInitialState } = roleSlice.actions
export default roleSlice.reducer
