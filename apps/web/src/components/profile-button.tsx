import React from 'react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronDown, LogOut } from 'lucide-react'
import Link from 'next/link'
import { auth } from '@/auth/auth'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

export default async function ProfileButton() {
  const { user } = await auth()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </div>

        <Avatar>
          {user.avatar_url && <AvatarImage src={user.avatar_url} alt="John Doe" />}
          {user.name && <AvatarFallback>{getInitials(user.name)}</AvatarFallback>}
        </Avatar>
        <ChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild className="cursor-pointer">
          <a href="/api/auth/sign-out">
            <LogOut className="mr-2 size-4 " />
            Sign out
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
