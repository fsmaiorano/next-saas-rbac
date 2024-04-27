import { fastify } from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import { createAccount } from './routes/auth/create-account'

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

app.register(createAccount)

app.listen({ port: 3333 }).then(() => {
  console.log('Server listening on port 3333')
})
