import { CheckInUseCase } from '../check-in'
import { PrismaCheckInsRepository } from '~/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymRepository } from '~/repositories/prisma/prisma-gyms-repository'

export function makeCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const prismaGymRepository = new PrismaGymRepository()
  const checkInUseCase = new CheckInUseCase(
    prismaCheckInsRepository,
    prismaGymRepository,
  )

  return checkInUseCase
}
