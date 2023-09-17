import { ValidateCheckInUseCase } from '../validate-check-in'
import { PrismaCheckInsRepository } from '~/repositories/prisma/prisma-check-ins-repository'

export function makeValidateCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const authenticateUseCase = new ValidateCheckInUseCase(
    prismaCheckInsRepository,
  )

  return authenticateUseCase
}
