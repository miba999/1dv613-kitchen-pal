import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start text-center px-6 py-20">
      <div className="flex flex-col items-center gap-4">
        <AlertTriangle className="w-12 h-12 text-destructive" />
        <h1 className="text-3xl font-bold">Sidan kunde inte hittas</h1>
        <p className="text-muted-foreground max-w-md">
          Oops! Sidan du försöker nå finns inte längre eller har flyttats. Kontrollera att länken är
          korrekt.
        </p>
        <Button asChild variant="outline">
          <Link to="/recipes">Tillbaka till recepten</Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
