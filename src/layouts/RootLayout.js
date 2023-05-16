import { Link, NavLink, Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <div className="site-title">
            <Link to='/'><h1>Kitchen Pal</h1></Link>
          </div>
          <div className="links">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='create'>Create Recipe</NavLink>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
