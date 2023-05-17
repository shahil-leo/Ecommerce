export interface RegisterUser {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
}
export interface Login {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  isAdmin: boolean
  accessToken: string
}
export interface LoginData {
  email: string,
  password: string
}
