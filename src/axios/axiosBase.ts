import axios from 'axios'

const axiosPublicInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json"
  }
})

const axiosPrivateInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})

export { axiosPrivateInstance, axiosPublicInstance }