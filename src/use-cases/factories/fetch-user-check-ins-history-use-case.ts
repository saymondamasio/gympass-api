import { FetchUserCheckInsHistoryInUseCase } from '../fetch-user-check-ins-history'
import { PrismaCheckInsRepository } from '~/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const fetchNearbyGymsUseCase = new FetchUserCheckInsHistoryInUseCase(
    prismaCheckInsRepository,
  )

  return fetchNearbyGymsUseCase
}
