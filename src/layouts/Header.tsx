import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface HeaderProps {
  title?: string
  rightContent?: ReactNode
}

const Header = ({
  title = 'Kökskompanjonen 🍕',
  rightContent,
}: HeaderProps) => {
  return (
    <header className="border-b bg-white px-4 py-3 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          aria-label="Gå till startsidan"
        >
          {title}
        </Link>
        {rightContent}
      </div>
    </header>
  )
}

export default Header
