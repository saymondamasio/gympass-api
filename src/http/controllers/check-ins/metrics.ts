import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetricsUseCase } from '~/use-cases/factories/get-user-metrics-use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const metricsUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await metricsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}
