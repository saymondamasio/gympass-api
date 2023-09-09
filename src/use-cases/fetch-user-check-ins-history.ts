import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '~/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page?: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    if (!checkIns) {
      throw new ResourceNotFoundError()
    }

    return { checkIns }
  }
}
