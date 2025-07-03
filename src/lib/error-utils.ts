export function getErrorMessage(error: string): string {
  const errorMap: Record<string, string> = {
    'Username already exists': 'This username is already taken. Please choose a different one.',
    'User already registered': 'An account with this email already exists. Try signing in instead.',
    'Invalid email': 'Please enter a valid email address.',
    'Password should be at least 6 characters': 'Password must be at least 6 characters long.',
    'Signup requires a valid password': 'Please enter a valid password.',
  }

  return errorMap[error] || error
}

export function getErrorType(error: string): 'username' | 'email' | 'password' | 'general' {
  if (error.toLowerCase().includes('username')) return 'username'
  if (error.toLowerCase().includes('email')) return 'email'
  if (error.toLowerCase().includes('password')) return 'password'
  return 'general'
}