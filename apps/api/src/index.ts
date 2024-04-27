import { defineAbilityFor } from '@saas/auth'

const ability = defineAbilityFor({ role: 'admin' })

const userCanInviteSomeone = ability.can('invite', 'User')
const userCanDeleteOtherUsers = ability.can('delete', 'User')

const userCannotDeleteOtherUsers = ability.cannot('delete', 'User')

console.log(userCanInviteSomeone) // true
console.log(userCanDeleteOtherUsers) // false
console.log(userCannotDeleteOtherUsers) // true
