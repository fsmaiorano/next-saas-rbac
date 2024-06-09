'use server'

import { redirect } from 'next/navigation'

export async function signInWithGithub() {
  const githubSignInUrl = new URL('login/oauth/authorize', 'https://github.com')

  githubSignInUrl.searchParams.set('client_id', '695031df567670ee7045')
  githubSignInUrl.searchParams.set('redirect_url', 'http://localhost:3000/api/auth/callback')
  githubSignInUrl.searchParams.set('scope', 'user')

  redirect(githubSignInUrl.toString())
}
