import { Gym } from '@prisma/client'
import { GymsRepository } from '~/repositories/gyms-repository'

interface CreateGymUseCaseRequest {
  name: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    name,
    description,
    latitude,
    longitude,
    phone,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      description,
      name,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
