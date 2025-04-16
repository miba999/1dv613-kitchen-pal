import * as React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { AuthUserProvider } from './context/AuthContext'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <AuthUserProvider>
        <RouterProvider router={router} />
      </AuthUserProvider>
    </React.Suspense>
  )
}

export default App
