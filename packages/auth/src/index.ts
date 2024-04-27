import { createMongoAbility, ForcedSubject, CreateAbility, MongoAbility, AbilityBuilder } from '@casl/ability'
import { User } from './models/user-model'
import { permissions } from './permissions'
import { UserSubject } from './subjects/user-subject'
import { ProjectSubject } from './subjects/project-subject'
import { OrganizationSubject } from './subjects/organization-subject'
import { BillingSubject } from './subjects/billing'
import { InviteSubject } from './subjects/invite'

type AppAbilities =
  | UserSubject
  | ProjectSubject
  | OrganizationSubject
  | BillingSubject
  | InviteSubject
  | ['manage', 'all']

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Unknown role: ${user.role}`)
  }

  permissions[user.role](user, builder)

  const ability = builder.build()
  return ability
}
