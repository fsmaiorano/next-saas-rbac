import { isAuthenticated } from '@/auth/auth'
import { redirect } from 'next/navigation'
import Header from '@/components/header'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!isAuthenticated()) return redirect('/auth/sign-in')

  return (
    <div className="py-4 space-y-4">
      <Header />
      <main className="mx-auto w-full max-w-[1200px]">{children}</main>
    </div>
  )
}
