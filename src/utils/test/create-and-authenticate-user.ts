import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { prisma } from '~/lib/prisma'

type Role = 'ADMIN' | 'MEMBER'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  role?: Role,
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: await hash('123456', 6),
      role,
    },
  })

  // await request(app.server).post('/users').send({
  //   name: 'John Doe',
  //   email: 'john@example.com',
  //   password: '123456',
  // })

  const responseAuth = await request(app.server).post('/sessions').send({
    email: 'john@example.com',
    password: '123456',
  })

  const token = responseAuth.body.token

  return { token }
}
