import { z } from 'zod'
import { roleSchema } from './role-model'

export const userSchema = z.object({
  role: roleSchema,
})

export type User = {
  role: 'admin' | 'member'
}
