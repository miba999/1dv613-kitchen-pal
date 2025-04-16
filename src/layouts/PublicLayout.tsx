import { Outlet, Link } from 'react-router-dom'
import Header from './Header'
import { Button } from '@/components/ui/button'

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header
        rightContent={
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/login">Logga in</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Skapa konto</Link>
            </Button>
          </div>
        }
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default PublicLayout
