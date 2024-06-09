import { isAuthenticated } from '@/auth/auth'
import { redirect } from 'next/navigation'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (isAuthenticated()) return redirect('/')
  return (
    <div className="min-h-screen flex items-center justify-center flex-col px-4">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
