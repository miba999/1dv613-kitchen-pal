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
    <main className="bg-slate-50 px-4 py-4 min-h-screen">
      <div className="max-w-3xl mx-auto rounded-lg border bg-white shadow-sm p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Välkommen till Kökskompanjonen 🍽️</h1>
        <p className="mb-6 text-muted-foreground">
          Samla, organisera och planera dina vardagsrecept. Skapa konto eller logga in för att komma
          igång!
        </p>

        <div className="flex gap-4 justify-center">
          <Button asChild variant="outline">
            <Link to="/login">Logga in</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Skapa konto</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

export default PublicHome
