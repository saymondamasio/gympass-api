import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '~/use-cases/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const createParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const { latitude, longitude } = createBodySchema.parse(request.body)
  const { gymId } = createParamsSchema.parse(request.params)

  const createUseCase = makeCheckInUseCase()

  await createUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
