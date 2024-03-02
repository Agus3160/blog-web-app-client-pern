import { Roles } from "./enums"

/// <reference types="vite/client" />

export type Session = {
  username: string
  profileImage: string | null
  userId: string 
  accessToken: string
  role: Roles
}

export type RegisterCredentials = {
  username: string
  email: string
  password: string
  image: string|null
  role: Roles.ADMIN | Roles.USER
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
  newImage: string|null
  oldImageUrl: string|null
}

export type PostRes = {
  id: string,
  title: string,
  content: string,
  imageUrl: string|null,
  createdAt: string,
  updatedAt: string,
  author: string
}

export type UserData = {
  username: string
  email: string
  imageUrl: string|null
  role: Roles
}

export type UserDataPutReq = {
  username: string,
  email: string,
  currentPassword: string,
  newImage: string|null
  role: Roles
}

export type ChangePasswordReq = {
  currentPassword: string
  newPassword: string
}

export type NewAccessToken = {
  newAccessToken: string
}

export type Users = {
  username: string;
  role: $Enums.Role;
  id: string;
  imageUrl: string|null;
}