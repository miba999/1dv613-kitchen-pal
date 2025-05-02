import { NavLink, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const AppNav = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'font-semibold text-blue-600' : 'text-muted-foreground'

  return (
    <nav className="bg-white border-b px-4 py-2 shadow-sm">
  <div className="container mx-auto flex justify-between items-center text-sm">
        {/* Left links */}
        <div className="flex space-x-6">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/recipes" className={linkClass}>
            Recept
          </NavLink>
          <NavLink to="/shopping-list" className={linkClass}>
            Inköpslista
          </NavLink>
          <NavLink to="/profile" className={linkClass}>
            Profil
          </NavLink>
        </div>

        {/* Right CTA */}
        <Button size="sm" asChild>
          <Link to="/recipes/new">Nytt recept</Link>
        </Button>
      </div>
    </nav>
  )
}

export default AppNav
