import { SearchGymsUseCase } from '../search-gyms'
import { PrismaGymRepository } from '~/repositories/prisma/prisma-gyms-repository'

export function makeSearchGymsUseCase() {
  const prismaGymRepository = new PrismaGymRepository()
  const searchGymsUseCase = new SearchGymsUseCase(prismaGymRepository)

  return searchGymsUseCase
}
