import { GetUserMetricsInUseCase } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '~/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const registerUseCase = new GetUserMetricsInUseCase(prismaCheckInsRepository)

  return registerUseCase
}
