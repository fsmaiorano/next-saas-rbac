import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

export default function OrganizationSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <span className="text-muted-foreground">Select organization</span>
        <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" alignOffset={-16} sideOffset={12} className="w-[200px]">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="cursor-default">Organizations</DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer">
            <Avatar className="mr-2 size-5">
              <AvatarImage src="https://github.com/fsmaiorano.png" alt="avatar" />
              <AvatarFallback />
            </Avatar>
            <span className="line-clamp-1">fsmaiorano</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <PlusCircle className="mr-2 size-5 text-primary" />
          <Link href="/create-organization">Create new</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
