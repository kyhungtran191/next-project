import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllRoles } from 'src/services/roles'
import { TParamsGetAllRoles } from 'src/types/role'

// ** Add User
export const getAllRolesAsync = createAsyncThunk('roles/get-all', async (data: { params: TParamsGetAllRoles }) => {
  const response = await getAllRoles(data)
  if (response.data) {
    return response
  }
})
