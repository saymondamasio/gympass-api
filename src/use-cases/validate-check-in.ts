import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '~/repositories/check-ins-repository'
import { GymsRepository } from '~/repositories/gyms-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '~/utils/get-distance-between-coordinates'
import { MaxNumberOfCheckInsError } from './errors/max-numbers-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

interface ValidateCheckInUseCaseRequest {
  checkId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const diffMinutesOfCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (diffMinutesOfCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}