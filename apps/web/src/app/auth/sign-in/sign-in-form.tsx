'use client'
import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState } from 'react'

import githubIcon from '@/assets/github-icon.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { signInWithEmailAndPassword } from './actions'

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(
    signInWithEmailAndPassword,
    {
      success: false,
      message: null,
      errors: null,
    },
  )

  return (
    <form action={formAction} method={''} className={'space-y-4'}>
      {state.success === false && state.message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4 mr-2" />
          <AlertTitle>Sign in failed</AlertTitle>
          <AlertDescription>
            <p>{state.message}</p>
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-1">
        <Label>E-mail</Label>
        <Input type={'email'} name="email" id="email" />
        {state.errors?.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label>Password</Label>
        <Input type={'password'} name="password" id="password" />
        {state.errors?.password && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {state.errors.password[0]}
          </p>
        )}
        <Link
          href={'/auth/forgot-password'}
          className="text-xs font-medium text-foreground hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button type={'submit'} className="w-full" disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Sign in'}
      </Button>

      <Button variant="link" className="w-full" asChild>
        <Link href={'/auth/sign-up'}>Create new account</Link>
      </Button>

      <Separator />

      <Button type={'submit'} className="w-full" variant="outline">
        <Image
          src={githubIcon}
          alt="GitHub icon"
          className="mr-2 size-4 dark:invert"
        />
        Sign in with GitHub
      </Button>
    </form>
  )
}
