export type Country = {
  code: string
  name: string
  dialCode: string
  flag: string
}

export type TemporaryPhone = {
  number: string
  country: Country
  expiresIn: number
  status: 'active' | 'expired'
}

export type OTP = {
  code: string
  expiresIn: number
  status: 'active' | 'expired'
}

export type UiState = 'idle' | 'loading' | 'ready' | 'error'
