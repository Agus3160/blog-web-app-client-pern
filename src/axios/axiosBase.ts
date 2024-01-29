import axios from 'axios'

const BASER_URL = 'https://blog-web-app-service.onrender.com'

const axiosPublicInstance = axios.create({
  baseURL: BASER_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
})

const axiosPrivateInstance = axios.create({
  baseURL: BASER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json" 
  }
})

export { axiosPrivateInstance, axiosPublicInstance }