import { auth } from '@/auth/auth'

export default async function Home() {
  const { user } = await auth()
  return (
    <div>
      <p>Welcome, {user.name}!</p>
    </div>
  )
}
