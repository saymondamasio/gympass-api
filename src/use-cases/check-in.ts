import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '~/repositories/check-ins-repository'
import { GymsRepository } from '~/repositories/gyms-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '~/utils/get-distance-between-coordinates'
import { MaxNumberOfCheckInsError } from './errors/max-numbers-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLongitude: number
  userLatitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const userCoordinate = {
      latitude: userLatitude,
      longitude: userLongitude,
    }

    const gymCoordinate = {
      latitude: gym.latitude.toNumber(),
      longitude: gym.longitude.toNumber(),
    }

    const distanceBetweenUserAndGym = getDistanceBetweenCoordinates(
      userCoordinate,
      gymCoordinate,
    )

    const MAX_DISTANCE_IN_METRES = 100

    console.log(distanceBetweenUserAndGym, 'AQUUUUUUUU')

    if (distanceBetweenUserAndGym > MAX_DISTANCE_IN_METRES) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}
