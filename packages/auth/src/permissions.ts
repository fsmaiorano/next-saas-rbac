import { AbilityBuilder } from '@casl/ability'
import { AppAbility } from '.'
import { Role } from './models/role-model'
import { User } from './models/user-model'

type PermissionsByRole = (user: User, builder: AbilityBuilder<AppAbility>) => void

export const permissions: Record<Role, PermissionsByRole> = {
  admin(_, builder) {
    builder.can('manage', 'all')
  },
  member(user, builder) {
    builder.can(['create', 'get'], 'Project')
    builder.can(['update', 'delete'], 'Project', { ownerId: { $eq: user.id } })
  },
  billing() {},
}
