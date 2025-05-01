import { createContext } from 'react'
import { User } from 'firebase/auth'
import { logIn, signUp, logOut, googleSignIn } from '@/lib/authHelpers'

export type AuthContextData = {
  user: User | null
  loading: boolean
  logIn: typeof logIn
  signUp: typeof signUp
  logOut: typeof logOut
  googleSignIn: typeof googleSignIn
}

export const AuthUserContext = createContext<AuthContextData>({
  user: null,
  loading: true,
  logIn,
  signUp,
  logOut,
  googleSignIn,
})
