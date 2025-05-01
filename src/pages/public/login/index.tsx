import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
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
import { useAuthUser } from '@/hooks/useAuthUser'

const initialValue: UserLogIn = {
  email: '',
  password: '',
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = () => {
  const { user, loading, googleSignIn, logIn } = useAuthUser()

  const [formError, setFormError] = useState<string | null>(null) // For the Google sign-in error
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const [userLoginInfo, setUserLoginInfo] = useState<UserLogIn>(initialValue)

  const navigate = useNavigate()

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setEmailError(null) // Reset error message
    setPasswordError(null) // Reset error message
    setFormError(null) // Reset error message

    try {
      await googleSignIn()
      navigate('/')
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Google Sign-In Error:', error)
      }

      setFormError('Google-inloggning misslyckades. Försök igen.')
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()

    setEmailError(null) // Reset error message
    setPasswordError(null) // Reset error message
    setFormError(null) // Reset error message

    let valid = true

    // Manual validation
    if (userLoginInfo.email.trim() === '') {
      setEmailError('E-postadress får inte vara tom.')
      valid = false
    } else if (!userLoginInfo.email.includes('@')) {
      setEmailError('Ange en giltig e-postadress.')
      valid = false
    }

    if (userLoginInfo.password.trim() === '') {
      setPasswordError('Lösenord får inte vara tomt.')
      valid = false
    }

    if (!valid) {
      return
    }

    try {
      await logIn(userLoginInfo.email, userLoginInfo.password)
      navigate('/')
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (import.meta.env.DEV) {
          console.error('Firebase error:', error)
        }

        // Show nice UI error based on Firebase error codes
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            setFormError('Fel e-post eller lösenord.')
            break
          case 'auth/invalid-email':
            setFormError('Ange en giltig e-postadress.')
            break
          default:
            setFormError('Ett tekniskt fel inträffade. Försök igen.')
        }
      } else {
        setFormError('Ett oväntat fel inträffade.')
      }
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
                    type="text"
                    className={
                      emailError
                        ? 'border-red-500 focus-visible:ring-red-500'
                        : ''
                    }
                    autoComplete="off"
                    placeholder="m@example.com"
                    value={userLoginInfo.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setEmailError(null) // Reset error message
                      setFormError(null)
                      setUserLoginInfo({
                        ...userLoginInfo,
                        email: e.target.value,
                      })
                    }}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Lösenord</Label>
                  <Input
                    id="password"
                    type="password"
                    className={
                      passwordError
                        ? 'border-red-500 focus-visible:ring-red-500'
                        : ''
                    }
                    placeholder="Lösenord"
                    value={userLoginInfo.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPasswordError(null) // Reset error message
                      setFormError(null)
                      setUserLoginInfo({
                        ...userLoginInfo,
                        password: e.target.value,
                      })
                    }}
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                  )}
                </div>
              </CardContent>

              {formError && (
                <p className="text-red-500 text-sm text-center">{formError}</p>
              )}
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
