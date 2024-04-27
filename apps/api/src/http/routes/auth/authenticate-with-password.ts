import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import * as repl from 'node:repl'

export async function authenticateWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/sessions/password', {
    schema: {
      body: z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }),
    },
    handler: async (request, reply) => {
      const { email, password } = request.body
      const userFromEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (!userFromEmail) {
        return reply.status(401).send({
          message: 'Invalid email or password',
        })
      }

      if (userFromEmail.passwordHash === null) {
        return reply.status(401).send({
          message: 'User does not have a password, please login with a different method',
        })
      }

      const isPasswordValid = await compare(password, userFromEmail.passwordHash)

      if (!isPasswordValid) {
        return reply.status(401).send({
          message: 'Invalid email or password',
        })
      }

      const token = await reply.jwtSign(
        {
          sub: userFromEmail.id,
          email: userFromEmail.email,
          name: userFromEmail.name,
          avatarUrl: userFromEmail.avatarUrl,
        },
        {
          expiresIn: '7d',
        }
      )

      return reply.send({
        token,
      })
    },
  })
}
