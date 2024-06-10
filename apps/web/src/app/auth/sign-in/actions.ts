'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { signInWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(6),
})

export async function signInWithEmailAndPassword(data: FormData) {
  const formValidate = signInSchema.safeParse(Object.fromEntries(data))

  if (!formValidate.success) {
    return {
      success: false,
      message: null,
      errors: formValidate.error.flatten().fieldErrors,
    }
  }

  const { email, password } = Object.fromEntries(data)

  await new Promise((resolve) => setTimeout(resolve, 2000))

  try {
    const { token } = await signInWithPassword({
      email: String(email),
      password: String(password),
    })

    console.log(token)
    cookies().set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })
  } catch (error) {
    console.error(error)

    if (error instanceof HTTPError) {
      const { message } = await error.response.json()
      return {
        success: false,
        message,
        errors: null,
      }
    } else {
      return {
        success: false,
        message: 'Unexpected error, try again in a few minutes.',
        errors: null,
      }
    }
  }
  return { success: true, message: null, errors: null }
}
