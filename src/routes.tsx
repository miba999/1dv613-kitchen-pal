import { createBrowserRouter } from 'react-router-dom'

// Layouts
import PublicLayout from '@/layouts/PublicLayout'
import AppLayout from '@/layouts/AppLayout'
import RequireAuth from '@/components/auth/RequireAuth'

// Public Pages
import PublicHome from '@/pages/public/home'
import Login from '@/pages/public/login'
import Signup from '@/pages/public/signup'
import NotFoundPage from '@/pages/public/not-found'

// Protected Pages
import RecipesPage from '@/pages/app/recipes'
import RecipeDetailPage from '@/pages/app/recipes/detail'
import RecipeNew from '@/pages/app/recipes/new'
import RecipeEdit from '@/pages/app/recipes/edit'

import Dashboard from '@/pages/app/dashboard'
// import Profile from '@/pages/app/profile'
import ShoppingListPage from './pages/app/shopping-list/index.tsx'
import PrivacyPage from './pages/public/privacy/index.tsx'

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <PublicHome /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/privacy', element: <PrivacyPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/dashboard', element: <Dashboard /> },
          // { path: '/profile', element: <Profile /> },
          { path: '/recipes', element: <RecipesPage /> },
          { path: '/recipes/new', element: <RecipeNew /> },
          { path: '/recipes/:id', element: <RecipeDetailPage /> },
          { path: '/recipes/:id/edit', element: <RecipeEdit /> },
          { path: '/shopping-list', element: <ShoppingListPage /> },
        ],
      },
    ],
  },
])

export default router
