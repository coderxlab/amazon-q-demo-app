export interface RegistrationFormData {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export interface RegistrationApiRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  username: string
}