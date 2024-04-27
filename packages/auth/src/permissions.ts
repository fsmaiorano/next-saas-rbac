import { AbilityBuilder } from '@casl/ability'
import { AppAbility } from '.'
import { Role } from './models/role-model'
import { User } from './models/user-model'

type PermissionsByRole = (user: User, builder: AbilityBuilder<AppAbility>) => void

export const permissions: Record<Role, PermissionsByRole> = {
  admin(user, builder) {
    builder.can('manage', 'all')
    builder.can(['transfer_ownership', 'update'], 'Organization', { ownerId: { $eq: user.id } })
    builder.cannot(['transfer_ownership', 'update'], 'Organization')
  },
  member(user, builder) {
    builder.can('get', 'User')
    builder.can(['create', 'get'], 'Project')
    builder.can(['update', 'delete'], 'Project', { ownerId: { $eq: user.id } })
  },
  billing(_, builder) {
    builder.can('manage', 'Billing')
  },
}
