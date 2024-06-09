'use client'
import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { type FormEvent, useState, useTransition } from 'react'

import githubIcon from '@/assets/github-icon.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { signInWithEmailAndPassword } from './actions'

export function SignInForm() {
  const [isPending, startTransition] = useTransition()
  const [formState, setFormState] = useState<{
    success: boolean
    message: string | null
    errors: Record<string, string[]> | null
  }>({
    success: false,
    message: null,
    errors: null,
  })

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await signInWithEmailAndPassword(data)
      setFormState(state)
    })
  }

  return (
    <form onSubmit={handleSignIn} method={''} className={'space-y-4'}>
      {formState.success === false && formState.message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4 mr-2" />
          <AlertTitle>Sign in failed</AlertTitle>
          <AlertDescription>
            <p>{formState.message}</p>
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-1">
        <Label>E-mail</Label>
        <Input type={'email'} name="email" id="email" />
        {formState.errors?.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {formState.errors.email[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label>Password</Label>
        <Input type={'password'} name="password" id="password" />
        {formState.errors?.password && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {formState.errors.password[0]}
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
