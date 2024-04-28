import { AbilityBuilder, CreateAbility, createMongoAbility, MongoAbility } from '@casl/ability'
import { User } from './models/user-model'
import { permissions } from './permissions'
import { UserSubject } from './subjects/user-subject'
import { ProjectSubject } from './subjects/project-subject'
import { OrganizationSubject } from './subjects/organization-subject'
import { BillingSubject } from './subjects/billing-subject'
import { InviteSubject } from './subjects/invite-subject'

type AppAbilities =
  | UserSubject
  | ProjectSubject
  | OrganizationSubject
  | BillingSubject
  | InviteSubject
  | ['manage', 'all']

export * from './models/organization-model.ts'
export * from './models/project-model.ts'
export * from './models/user-model.ts'
export * from './models/role-model.ts'

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Unknown role: ${user.role}`)
  }

  permissions[user.role](user, builder)

  return builder.build({
    detectSubjectType(subject) {
      return subject.__typename
    },
  })
}
