import { Link, Navigate } from 'react-router-dom'
import { useAuthUser } from '@/hooks/useAuthUser'
import LoadingSpinner from '@/components/ui/loading-spinner'
import { Button } from '@/components/ui/button'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IPublicHomeProps {}

const PublicHome: React.FunctionComponent<IPublicHomeProps> = () => {
  const { user, loading } = useAuthUser()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={40} />
      </div>
    )
  }

  if (user) {
    return <Navigate to="/dashboard" />
  }

  return (
    <main className="flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Välkommen till Kökskompanjonen 🍽️
      </h1>
      <p className="mb-6 text-muted-foreground max-w-md">
        Samla, organisera och planera dina vardagsrecept. Skapa konto eller
        logga in för att komma igång!
      </p>

      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link to="/login">Logga in</Link>
        </Button>
        <Button asChild>
          <Link to="/signup">Skapa konto</Link>
        </Button>
      </div>
    </main>
  )
}

export default PublicHome
