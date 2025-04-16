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
import { Icons } from '@/components/ui/icons'
import LoadingSpinner from '@/components/ui/loading-spinner'
import { UserSignIn } from '@/types'
import { useAuthUser } from '@/context/AuthContext'

const initialValue: UserSignIn = {
  email: '',
  password: '',
  confirmPassword: '',
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ISignupProps {}

const SignUp: React.FunctionComponent<ISignupProps> = () => {
  const { user, loading, googleSignIn, signUp } = useAuthUser()
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState<UserSignIn>(initialValue)
  const [error, setError] = useState<string | null>(null)

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

    if (userInfo.password !== userInfo.confirmPassword) {
      setError('Lösenord matchar inte')
      return
    }
    try {
      await signUp(userInfo.email, userInfo.password)
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
              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Skapa konto</CardTitle>
                <CardDescription>
                  Ange din e-postadress för att skapa ditt konto
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
                    value={userInfo.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Lösenord</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Lösenord"
                    value={userInfo.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUserInfo({ ...userInfo, password: e.target.value })
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Bekräfta lösenord</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Bekräfta lösenord"
                    value={userInfo.confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUserInfo({
                        ...userInfo,
                        confirmPassword: e.target.value,
                      })
                    }}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button className="w-full" type="submit">
                  Skapa konto
                </Button>
                <p className="mt-3 text-sm text-center">
                  Har du redan ett konto?{' '}
                  <Link to="/login" className="text-primary hover:underline">
                    Logga in
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

export default SignUp
