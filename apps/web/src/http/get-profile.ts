import { api } from './api-client'

interface GetProfileResponse {
  user: {
    id: string
    name: string
    email: string
    avatar_url: string
  }
}

export async function getProfile() {
  const result = await api.get('profile', {}).json<GetProfileResponse>()
  console.log(result)
  return result
}