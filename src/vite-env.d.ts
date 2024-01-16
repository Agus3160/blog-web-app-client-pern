/// <reference types="vite/client" />

export type Session = {
  username: string | null
  userId: string | null
  accessToken: string | null
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

export type ApiResponseErrorScheme = {
  success: boolean
  name?: string
  message?: string
  httpStatusCode?: number
}

export type PostReq = {
  title: string,
  content: string,
  authorId: string
}

export type PostRes = {
  id: string,
  title: string,
  content: string,
  createdAt: string,
  updatedAt: string,
  author: string
}