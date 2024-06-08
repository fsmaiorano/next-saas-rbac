import Image from 'next/image'
import Link from 'next/link'

import githubIcon from '@/assets/github-icon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignInPage() {
  return (
    <form action={''} method={''} className={'space-y-4'}>
      <div className="space-y-1">
        <Label>E-mail</Label>
        <Input type={'email'} name="email" id="email" />
      </div>

      <div className="space-y-1">
        <Label>Password</Label>
        <Input type={'password'} name="password" id="password" />
        <Link
          href={'/auth/forgot-password'}
          className="text-xs font-medium text-foreground hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button type={'submit'} className="w-full">
        Sign in
      </Button>
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
