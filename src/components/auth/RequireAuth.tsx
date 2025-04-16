import * as React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthUser } from '@/context/AuthContext' // Adjust the import path as necessary
import LoadingSpinner from '@/components/ui/loading-spinner'

const RequireAuth: React.FunctionComponent = () => {
  const { user, loading } = useAuthUser()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
      <LoadingSpinner size={40} />
    </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default RequireAuth
