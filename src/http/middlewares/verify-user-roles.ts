import { FastifyReply, FastifyRequest } from 'fastify'

type Role = 'ADMIN' | 'MEMBER'

export function verifyUserRoles(roles: Role[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const role = request.user.role

    if (!role || (role && !roles.includes(role))) {
      return reply.status(401).send({
        message: 'Unauthorized',
      })
    }
  }
}
