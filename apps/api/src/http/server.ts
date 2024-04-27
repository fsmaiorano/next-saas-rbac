import { fastify } from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import { createAccount } from './routes/auth/create-account'
import { authenticateWithPassword } from '@/http/routes/auth/authenticate-with-password'
import { getProfile } from './routes/auth/get-profile'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {})
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js SaaS + RBAC',
      version: '1.0.0',
      description:
        'This project contains all the necessary boilerplate to setup a multi-tenant SaaS with Next.js including authentication and RBAC authorization.',
    },
    servers: [{ url: 'http://localhost:3333', description: 'Development server' }],
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: 'jwt-secret-key',
  sign: { expiresIn: '7d' },
})

app.register(createAccount)
app.register(authenticateWithPassword)
app.register(getProfile)

app.listen({ port: 3333 }).then(() => {
  console.log('Server listening on port 3333')
})