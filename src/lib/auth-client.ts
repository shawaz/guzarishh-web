// Client-side authentication helpers
export const authClient = {
  async signIn(email: string, password: string) {
    const response = await fetch('/api/auth/sign-in/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Sign in failed')
    }

    return await response.json()
  },

  async signUp(email: string, password: string, name?: string) {
    const response = await fetch('/api/auth/sign-up/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password, name }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Sign up failed')
    }

    return await response.json()
  },

  async signOut() {
    const response = await fetch('/api/auth/sign-out', {
      method: 'POST',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Sign out failed')
    }
  },

  async getSession() {
    const response = await fetch('/api/auth/session', {
      credentials: 'include',
    })

    if (!response.ok) {
      return null
    }

    return await response.json()
  },

  async signInWithGoogle() {
    window.location.href = '/api/auth/sign-in/google'
  }
}





