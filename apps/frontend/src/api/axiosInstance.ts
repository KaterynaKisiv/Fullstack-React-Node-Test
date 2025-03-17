import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost/api',
})

export default axiosInstance
