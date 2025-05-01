import { useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'
import { logIn, signUp, logOut, googleSignIn } from '@/lib/authHelpers'
import { AuthContextData, AuthUserContext } from '@/context/AuthContext'

interface IAuthUserProviderProps {
  children: React.ReactNode
}

export const AuthUserProvider: React.FunctionComponent<IAuthUserProviderProps> = ({ children }) => {
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

  return <AuthUserContext.Provider value={value}>{children}</AuthUserContext.Provider>
}
