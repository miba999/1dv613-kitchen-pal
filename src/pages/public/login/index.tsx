import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import LoadingSpinner from '@/components/ui/loading-spinner'

import { Icons } from '@/components/ui/icons'
import { UserLogIn } from '@/types'
import { useAuthUser } from '@/context/AuthContext'

const initialValue: UserLogIn = {
  email: '',
  password: '',
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = () => {
  const { user, loading, googleSignIn, logIn } = useAuthUser()
  const navigate = useNavigate()
  const [userLoginInfo, setUserLoginInfo] = useState<UserLogIn>(initialValue)

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    try {
      await googleSignIn()
      navigate('/')
    } catch (error) {
      console.log('Error : ', error)
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await logIn(userLoginInfo.email, userLoginInfo.password)
      navigate('/')
    } catch (error) {
      console.log('Error : ', error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={40} />
      </div>
    )
  }

  if (user) return <Navigate to="/dashboard" />

  return (
    <div className="container mx-auto p-6 flex h-full">
      <div className="flex justify-center items-center w-full">
        <div className="max-w-sm w-full rounded-xl border bg-card text-card-foreground shadow-sm">
          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Logga in</CardTitle>
                <CardDescription>
                  Ange din e-postadress för att logga in på ditt konto
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleGoogleSignIn}
                  >
                    <Icons.google className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Eller fortsätt med
                    </span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">E-postadress</Label>
                  <Input
                    id="email"
                    name="signup-email"
                    type="email"
                    autoComplete="off"
                    placeholder="m@example.com"
                    value={userLoginInfo.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUserLoginInfo({
                        ...userLoginInfo,
                        email: e.target.value,
                      })
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Lösenord</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Lösenord"
                    value={userLoginInfo.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUserLoginInfo({
                        ...userLoginInfo,
                        password: e.target.value,
                      })
                    }}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button className="w-full" type="submit">
                  Logga in
                </Button>
                <p className="mt-3 text-sm text-center">
                  Har du inget konto?{' '}
                  <Link to="/signup" className="text-primary hover:underline">
                    Skapa ett här
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Login
