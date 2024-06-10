import logo from '@/assets/logo.svg'
import Image from 'next/image'
import ProfileButton from '@/components/profile-button'
import { Slash } from 'lucide-react'
import OrganizationSwitcher from '@/components/organization-switcher'
import { ability } from '@/auth/auth'
import { Separator } from '@/components/ui/separator'
import { ThemeSwitcher } from '@/components/theme/theme-switcher'

export default async function Header() {
  const permissions = await ability()
  return (
    <header className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Image src={logo} alt="Logo" className="size-8 " />

        <Slash className="size-3 -rotate-[24deg] text-border" />

        <OrganizationSwitcher />

        {permissions?.can('get', 'Project') && <p>Projects</p>}
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </header>
  )
}
