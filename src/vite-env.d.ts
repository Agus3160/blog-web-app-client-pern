/// <reference types="vite/client" />

export type Session = {
  username: string
  userId: string
  accessToken: string
}

export type RegisterCredentials = {
  username: string
  email: string
  password: string
}

export type LoginCredentials = {
  username: string
  password: string
}

export type ApiResponseScheme<T> = {
  success: boolean
  message?: string
  data?: T
}

export type ApiResponseErrorScheme<E = Error> = {
  success: boolean
  name?: string
  message?: string
  httpStatusCode?: number
  error: E
}