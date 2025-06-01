import { Link } from 'react-router-dom'
import { useAuthUser } from '@/hooks/useAuthUser'
import { useRecipes } from '@/hooks/useRecipes'

const DashboardPage: React.FC = () => {
  const { user } = useAuthUser()
  const { recipes, loading } = useRecipes()

  const recentRecipes = [...recipes]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)

  return (
    <main className="bg-muted min-h-screen py-4 px-4">
      <div className="max-w-4xl mx-auto bg-white border rounded-lg shadow p-6">
        {/* Welcome */}
        <h1 className="text-2xl font-bold mb-2">Hej, {user?.email}! 👋</h1>
        <p className="text-muted-foreground mb-6">
          Välkommen tillbaka till ditt kök. Vad vill du göra idag?
        </p>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Link
            to="/recipes/new"
            className="rounded-lg border p-4 shadow-sm hover:bg-muted transition"
          >
            ➕ Skapa nytt recept
          </Link>
          <Link
            to="/shopping-list"
            className="rounded-lg border p-4 shadow-sm hover:bg-muted transition"
          >
            🛒 Gå till inköpslistan
          </Link>
          <Link to="/recipes" className="rounded-lg border p-4 shadow-sm hover:bg-muted transition">
            📚 Se alla recept
          </Link>
        </div>

        {/* Recent recipes */}
        <div>
          <h2 className="text-xl font-semibold mb-4">📌 Senast tillagda recept</h2>

          {loading ? (
            <p className="text-muted-foreground">Laddar recept...</p>
          ) : recentRecipes.length === 0 ? (
            <p className="text-muted-foreground">Inga recept ännu. Börja med att lägga till ett!</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {recentRecipes.map((recipe) => (
                <Link
                  to={`/recipes/${recipe.id}`}
                  key={recipe.id}
                  className="block rounded-lg border bg-white shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  {recipe.imageUrl ? (
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-muted flex items-center justify-center text-4xl">
                      🍽️
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1 truncate">{recipe.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      ⏱ {recipe.cookTime} min • {recipe.portions} portioner
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default DashboardPage
