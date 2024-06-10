import { api } from './api-client'

interface GetOrganizationsResponse {
  organizations: {
    id: string
    name: string
    slug: string
    avatarUrl: string | null
  }[]
}

export async function getOrganization() {
  const result = await api.get('organization').json<GetOrganizationsResponse>()

  return result
}
