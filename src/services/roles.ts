import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import { TParamsGetAllRoles } from 'src/types/role'

export const getAllRoles = async (data: { params: TParamsGetAllRoles }) => {
  try {
    const res = await instanceAxios.get(API_ENDPOINT.ROLE.INDEX, data)
    return res.data
  } catch (err) {
    return err
  }
}
