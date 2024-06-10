import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getProfile } from '@/http/get-profile'
import { getMembership } from '@/http/get-membership'
import { defineAbilityFor } from '@saas/auth'

export function isAuthenticated() {
  return !!cookies().get('token')?.value
}

export async function auth() {
  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch (error) {
    redirect('/api/auth/sign-out')
  }
}

export function getCurrentOrganization() {
  return cookies().get('org')?.value ?? null
}

export async function getCurrentMembership() {
  const org = getCurrentOrganization()

  if (!org) {
    return null
  }

  console.log('Organization: ', org)

  const { membership } = await getMembership(org)

  console.log('Membership: ', membership)

  return membership
}

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  console.log(membership)

  return defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })
}
