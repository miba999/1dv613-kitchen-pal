import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useAuthUser } from '@/hooks/useAuthUser'

const Header = () => {
  const { user, logOut } = useAuthUser()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logOut()
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const closeMenu = () => setMenuOpen(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'font-semibold text-blue-600' : 'text-muted-foreground'

  return (
    <header className="relative z-10 border-b bg-white px-4 py-3 shadow-sm">
      {/* MOBILE header (up to md) */}
      <div className="md:hidden flex justify-between items-center container mx-auto">
        <Link to="/" className="text-xl font-bold text-foreground hover:text-primary">
          Kökskompanjonen 🍕
        </Link>

        <button className="p-2" onClick={toggleMenu} aria-label="Toggle navigation">
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* DESKTOP header (md and up) */}
      <div className="hidden md:flex justify-between items-center container mx-auto text-sm">
        {/* Left: logo + nav links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold text-foreground hover:text-primary">
            Kökskompanjonen 🍕
          </Link>

          {user && (
            <>
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/recipes" className={linkClass}>
                Recept
              </NavLink>
              <NavLink to="/shopping-list" className={linkClass}>
                Inköpslista
              </NavLink>
            </>
          )}
        </div>

        {/* Right: CTA + auth info */}
        <div className="flex items-center gap-4">
          {user && (
            <Button size="sm" asChild>
              <Link to="/recipes/new">Nytt recept</Link>
            </Button>
          )}

          {user ? (
            <>
              <span className="hidden md:inline text-xs text-muted-foreground">{user.email}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logga ut
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Logga in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Skapa konto</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* MOBILE menu content (up to md) */}
      {menuOpen && (
        <div className="md:hidden mt-3 px-4 flex flex-col gap-3 text-sm">
          {user ? (
            <>
              <NavLink to="/dashboard" className={linkClass} onClick={closeMenu}>
                Dashboard
              </NavLink>
              <NavLink to="/recipes" className={linkClass} onClick={closeMenu}>
                Recept
              </NavLink>
              <NavLink to="/shopping-list" className={linkClass} onClick={closeMenu}>
                Inköpslista
              </NavLink>

              {/* Mobile Nytt Recept button */}
              <Button size="sm" variant="outline" asChild>
                <Link to="/recipes/new" onClick={closeMenu}>
                  Nytt recept
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleLogout()
                  closeMenu()
                }}
              >
                Logga ut
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login" onClick={closeMenu}>
                  Logga in
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup" onClick={closeMenu}>
                  Skapa konto
                </Link>
              </Button>
            </>
          )}
        </div>
      )}
    </header>
  )
}

export default Header
