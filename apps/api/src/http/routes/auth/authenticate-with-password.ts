import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { env } from '@saas/env'

export async function authenticateWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/sessions/password', {
    schema: {
      tags: ['auth'],
      summary: 'Authenticate with email and password',
      body: z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }),
      response: {
        200: z.object({
          token: z.string(),
        }),
        401: z.object({
          message: z.string(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { email, password } = request.body
      const userFromEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (!userFromEmail) {
        throw new BadRequestError('Invalid email or password')
      }

      if (userFromEmail.passwordHash === null) {
        return reply.status(401).send({
          message: 'User does not have a password, please login with a different method',
        })
      }

      const isPasswordValid = await compare(password, userFromEmail.passwordHash)

      if (!isPasswordValid) {
        throw new BadRequestError('Invalid email or password')
      }

      const token = await reply.jwtSign(
        {
          sub: userFromEmail.id,
          email: userFromEmail.email,
          name: userFromEmail.name,
          avatarUrl: userFromEmail.avatarUrl,
        },
        {
          expiresIn: env.JWT_EXPIRES_IN,
        }
      )

      return reply.send({
        token,
      })
    },
  })
}
