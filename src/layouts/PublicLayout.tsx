import { Outlet } from 'react-router-dom'
import Header from './Header'

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow bg-muted">
        <Outlet />
      </main>
    </div>
  )
}

export default PublicLayout
