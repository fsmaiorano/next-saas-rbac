import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { authMiddleware } from '@/http/middlewares/auth-middleware'

export async function getProfile(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .get('/profile', {
      schema: {
        tags: ['auth'],
        security: [{ bearerAuth: [] }],
        summary: 'Get user profile',
        response: {
          200: z.object({
            user: z.object({
              id: z.string().uuid(),
              email: z.string().email(),
              name: z.string(),
              avatarUrl: z.string().nullable(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
      handler: async (request, reply) => {
        const { sub } = await request.jwtVerify<{ sub: string }>()

        const user = await prisma.user.findUnique({
          select: {
            id: true,
            email: true,
            name: true,
            avatarUrl: true,
          },
          where: {
            id: sub,
          },
        })

        if (!user) {
          throw new BadRequestError('User not found')
        }

        return reply.status(200).send({
          user: {
            ...user,
            name: user.name || '',
            avatarUrl: user.avatarUrl || null,
          },
        })
      },
    })
}
