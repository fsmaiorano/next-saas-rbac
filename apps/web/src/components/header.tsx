import Link from 'next/link'

import logo from '@/assets/logo.svg'
import Image from 'next/image'
import ProfileButton from '@/components/profile-button'

export default async function Header() {
  return (
    <header className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Image src={logo} alt="Logo" className="size-8 " />
      </div>
      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </header>
  )
}
