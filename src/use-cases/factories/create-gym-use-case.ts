import { CreateGymUseCase } from '../create-gym'
import { PrismaGymRepository } from '~/repositories/prisma/prisma-gyms-repository'

export function makeCreateGymUseCase() {
  const prismaGymRepository = new PrismaGymRepository()
  const createGymUseCase = new CreateGymUseCase(prismaGymRepository)

  return createGymUseCase
}
