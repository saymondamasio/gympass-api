import { FastifyInstance } from 'fastify'
import { verifyJwt } from '~/http/middlewares/verify-jwt'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'
import { verifyUserRoles } from '~/http/middlewares/verify-user-roles'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', { onRequest: [verifyUserRoles(['ADMIN'])] }, create)
}
