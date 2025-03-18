import axiosInstance from './axiosInstance'
import { Login, Register } from '../types/auth'

export const login = async (loginData: Login) => {
  try {
    const response = await axiosInstance.post('/login', loginData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const register = async (registerData: Register) => {
  try {
    const response = await axiosInstance.post('/register', registerData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const logout = async () => {
  try {
    const response = await axiosInstance.post('/logout')
    return response.data
  } catch (error) {
    throw error
  }
}