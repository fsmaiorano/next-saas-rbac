import Image from 'next/image'
import Link from 'next/link'

import githubIcon from '@/assets/github-icon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SignUpPage() {
  return (
    <form action={''} method={''} className={'space-y-4'}>
      <div className="space-y-1">
        <Label>Name</Label>
        <Input type={'text'} name="name" id="name" />
      </div>

      <div className="space-y-1">
        <Label>E-mail</Label>
        <Input type={'email'} name="email" id="email" />
      </div>

      <div className="space-y-1">
        <Label>Password</Label>
        <Input type={'password'} name="password" id="password" />
      </div>

      <div className="space-y-1">
        <Label>Confirm your password</Label>
        <Input
          type={'password'}
          name="password-confirmation"
          id="password-confirmation"
        />
      </div>

      <Button type={'submit'} className="w-full">
        Create account
      </Button>

      <Button variant="link" className="w-full" asChild>
        <Link href={'/auth/sign-in'}>Already have an account? Sign in</Link>
      </Button>

      <Separator />

      <Button type={'submit'} className="w-full" variant="outline">
        <Image
          src={githubIcon}
          alt="GitHub icon"
          className="mr-2 size-4 dark:invert"
        />
        Sign up with GitHub
      </Button>
    </form>
  )
}
