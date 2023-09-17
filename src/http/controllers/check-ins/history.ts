import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsHistoryUseCase } from '~/use-cases/factories/fetch-user-check-ins-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const historyQuerySchema = z.object({
    page: z.coerce.number().min(1).optional(),
  })

  const { page } = historyQuerySchema.parse(request.query)

  const historyUseCase = makeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await historyUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
