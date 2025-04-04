import axios from 'axios'
import PATHS from '../constants/paths'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      window.location.href = PATHS.LOGIN
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
