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
import { createOrganization } from '@/http/routes/org/create-organization'
import { getMembership } from '@/http/routes/org/get-membership'
import { getOrganization } from '@/http/routes/org/get-organization'
import { getOrganizationBySlug } from '@/http/routes/org/get-organization-by-slug'
import { updateOrganization } from '@/http/routes/org/update-organization'
import { deleteOrganization } from '@/http/routes/org/delete-organization'
import { transferOrganization } from './routes/org/transfer-organization'
import { createProject } from './routes/project/create-project'
import { deleteProject } from './routes/project/delete-project'
import { getProjectBySlug } from './routes/project/get-project-by-slug'
import { getProject } from './routes/project/get-project'
import { updateProject } from './routes/project/update-project'
import { getMember } from './routes/member/get-member'
import { updateMember } from './routes/member/update-member'
import { deleteMember } from './routes/member/delete-member'
import { createInvite } from './routes/invite/create-invite'
import { getInviteById } from './routes/invite/get-invite-by-id'
import { getInviteBySlug } from './routes/invite/get-invite-by-slug'

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
app.register(deleteOrganization)
app.register(transferOrganization)
app.register(createProject)
app.register(deleteProject)
app.register(getProjectBySlug)
app.register(getProject)
app.register(updateProject)
app.register(getMember)
app.register(updateMember)
app.register(deleteMember)
app.register(createInvite)
app.register(getInviteById)
app.register(getInviteBySlug)

const serverPort = env.SERVER_PORT || 3333
app.listen({ port: serverPort }).then(() => {
  console.log(`Server listening on port ${serverPort}`)
})
