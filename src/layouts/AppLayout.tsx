import { Outlet, Link } from 'react-router-dom'
import Header from './Header'

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow bg-muted px-0">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>

      <footer className="text-sm text-center text-muted-foreground py-4 border-t">
        © {new Date().getFullYear()} Kökskompanjonen.{' '}
        <Link to="/privacy" className="underline hover:text-foreground">
          Integritetspolicy
        </Link>{' '}
        |{' '}
        <a
          href="https://github.com/miba999/1dv613-kitchen-pal"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          GitHub
        </a>
      </footer>
    </div>
  )
}

export default AppLayout
