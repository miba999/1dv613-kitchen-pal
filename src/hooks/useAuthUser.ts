import { useContext } from 'react'
import { AuthUserContext } from '@/context/AuthContext'

// Custom hook to use the AuthUserContext
// This allows us to use the context in any component without needing to import useContext and AuthUserContext every time
export const useAuthUser = () => useContext(AuthUserContext)
