import { fastify } from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import { createAccount } from './routes/auth/create-account'
import { authenticateWithPassword } from '@/http/routes/auth/authenticate-with-password'
import { getProfile } from './routes/auth/get-profile'
import { ErrorHandler } from '@/http/error-handler'
import { requestPasswordRecover } from '@/http/routes/auth/request-password-recovery'
import { resetPassword } from '@/http/routes/auth/reset-password'
import { authenticateWithGithub } from '@/http/routes/auth/authenticate-with-github'
import { env } from '@saas/env'
import { createOrganization } from '@/http/routes/orgs/create-organization'
import { getMembership } from '@/http/routes/orgs/get-membership'
import { getOrganization } from '@/http/routes/orgs/get-organization'
import { getOrganizationBySlug } from '@/http/routes/orgs/get-organization-by-slug'
import { updateOrganization } from '@/http/routes/orgs/update-organization'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {})
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.setErrorHandler(ErrorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js SaaS + RBAC',
      version: '1.0.0',
      description:
        'This project contains all the necessary boilerplate to setup a multi-tenant SaaS with Next.js including authentication and RBAC authorization.',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    servers: [{ url: `http://localhost:${env.SERVER_PORT}`, description: 'Development server' }],
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: env.JWT_EXPIRES_IN },
})

app.register(createAccount)
app.register(authenticateWithPassword)
app.register(getProfile)
app.register(requestPasswordRecover)
app.register(resetPassword)
app.register(authenticateWithGithub)
app.register(createOrganization)
app.register(getMembership)
app.register(getOrganizationBySlug)
app.register(getOrganization)
app.register(updateOrganization)

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log(`Server listening on port ${env.SERVER_PORT}`)
})
