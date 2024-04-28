import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'
import { env } from '@saas/env'

export async function authenticateWithGithub(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/sessions/github', {
    schema: {
      tags: ['auth'],
      summary: 'Authenticate with github',
      description:
        'Example: https://github.com/login/oauth/authorize?client_id=github_client_id&redirect_uri=http://localhost:3000/api/auth/callback&scope=user:email',
      body: z.object({
        code: z.string(),
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
      const { code } = request.body

      const githubOauthUrl = new URL('https://github.com/login/oauth/access_token')

      githubOauthUrl.searchParams.set('code', code)
      githubOauthUrl.searchParams.set('redirect_uri', env.GITHUB_OAUTH_REDIRECT_URL)
      githubOauthUrl.searchParams.append('client_id', env.GITHUB_OAUTH_CLIENT_ID)
      githubOauthUrl.searchParams.append('client_secret', env.GITHUB_OAUTH_CLIENT_SECRET)

      const githubAccessTokenResponse = await fetch(githubOauthUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      })

      const githubAccessTokenData = await githubAccessTokenResponse.json()

      console.log(githubAccessTokenData)

      const { access_token: githubAccessToken } = z
        .object({
          access_token: z.string(),
          token_type: z.string(),
          scope: z.string(),
        })
        .parse(githubAccessTokenData)

      const githubUserResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${githubAccessToken}`,
        },
      })

      const githubUserData = await githubUserResponse.json()

      console.log(githubUserData)

      const {
        id: githubId,
        name,
        email,
        avatar_url,
      } = z
        .object({
          id: z.number().int().transform(String),
          avatar_url: z.string(),
          email: z.string().email(),
          name: z.string().nullable(),
        })
        .parse(githubUserData)

      if (email === null) {
        throw new BadRequestError("Your GitHub account doesn't have an email address")
      }

      let user = await prisma.user.findFirst({ where: { email } })

      if (!user) {
        user = await prisma.user.create({
          data: {
            name,
            email,
            avatarUrl: avatar_url,
          },
        })
      }

      let account = await prisma.account.findUnique({
        where: {
          provider_userId: {
            provider: 'GITHUB',
            userId: user.id,
          },
        },
      })

      if (!account) {
        account = await prisma.account.create({
          data: {
            provider: 'GITHUB',
            userId: user.id,
            providerAccountId: githubId,
          },
        })
      }

      const token = await reply.jwtSign(
        {
          sub: user.id,
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
