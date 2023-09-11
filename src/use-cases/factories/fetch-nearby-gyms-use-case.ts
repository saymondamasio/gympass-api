import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'
import { PrismaGymRepository } from '~/repositories/prisma/prisma-gyms-repository'

export function makeFetchNearbyGymsUseCase() {
  const prismaGymRepository = new PrismaGymRepository()
  const fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(prismaGymRepository)

  return fetchNearbyGymsUseCase
}
