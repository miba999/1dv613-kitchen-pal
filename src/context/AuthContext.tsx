import { createContext, useContext, useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import { logIn, signUp, logOut, googleSignIn } from '../lib/authHelpers'

interface IAuthUserProviderProps {
  children: React.ReactNode
}

type AuthContextData = {
  user: User | null
  loading: boolean
  logIn: typeof logIn
  signUp: typeof signUp
  logOut: typeof logOut
  googleSignIn: typeof googleSignIn
}

const AuthUserContext = createContext<AuthContextData>({
  user: null,
  loading: true,
  logIn,
  signUp,
  logOut,
  googleSignIn,
})

export const AuthUserProvider: React.FunctionComponent<
  IAuthUserProviderProps
> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser) // null or a user object
      setLoading(false) // Set loading to false when user is found
    })

    return () => unsubscribe()
  }, [])

  const value: AuthContextData = {
    user,
    loading,
    logIn,
    signUp,
    logOut,
    googleSignIn,
  }

  return (
    <AuthUserContext.Provider value={value}>
      {children}
    </AuthUserContext.Provider>
  )
}

// Custom hook to use the AuthUserContext
// This allows us to use the context in any component without needing to import useContext and AuthUserContext every time
export const useAuthUser = () => useContext(AuthUserContext)
