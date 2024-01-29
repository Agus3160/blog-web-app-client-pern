/// <reference types="vite/client" />

export type Session = {
  username: string | null
  profileImage: string | null
  userId: string | null
  accessToken: string | null
}

export type RegisterCredentials = {
  username: string
  email: string
  password: string
  image: string
}

export type LoginCredentials = {
  username: string
  password: string
}

export type ApiResponseScheme<T = undefined> = {
  success: boolean
  message: string
  data?: T?
}

export type ApiResponseErrorScheme = {
  success: boolean
  message: string
  name: string
  httpStatusCode?: number
}

export type PostReq = {
  title: string,
  content: string,
  authorId: string
}

export type PostPutReq = {
  title: string,
  content: string
  newImage: string
  oldImageUrl: string
}

export type PostRes = {
  id: string,
  title: string,
  content: string,
  imageUrl: string,
  createdAt: string,
  updatedAt: string,
  author: string
}

export type UserData = {
  username: string
  email: string
}

export type UserDataPutReq = {
  username: string,
  email: string,
  currentPassword: string,
  newImage: string
}

export type ChangePasswordReq = {
  currentPassword: string
  newPassword: string
}