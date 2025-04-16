import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthUser } from '@/context/AuthContext'
import Header from './Header'
import AppNav from './AppNav'
import { Button } from '@/components/ui/button'
import { toast } from "sonner"

const AppLayout = () => {
  const { user, logOut } = useAuthUser()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logOut()
      toast.success("Du har loggats ut 👋");
      navigate("/")
    } catch (error) {
      toast.error("Kunde inte logga ut just nu.");
      console.error('Error logging out:', error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        rightContent={
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Logga ut
            </Button>
          </div>
        }
      />

      <AppNav />

      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
