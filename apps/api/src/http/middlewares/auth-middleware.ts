import { FastifyInstance } from 'fastify'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import fastifyPlugin from 'fastify-plugin'
import { prisma } from '@/lib/prisma'

export const authMiddleware = fastifyPlugin(async (app: FastifyInstance) => {
  app.decorateRequest('getCurrentUserId', null)
  app.addHook('preHandler', async (request, reply) => {
    console.log(request.headers)
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()
        return sub
      } catch (error) {
        throw new UnauthorizedError('Invalid token')
      }
    }

    request.getUserMembership = async (slug: string) => {
      const userId = await request.getCurrentUserId()

      const member = await prisma.member.findFirst({
        where: {
          userId,
          organization: {
            slug,
          },
        },
        include: {
          organization: true,
        },
      })

      if (!member) {
        throw new UnauthorizedError(`You're not a member of this organization.`)
      }

      const { organization, ...membership } = member

      return {
        organization,
        membership,
      }
    }
  })
})
