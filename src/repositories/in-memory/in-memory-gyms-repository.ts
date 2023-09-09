import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryGymsRepository implements GymsRepository {
  private gyms: Gym[] = []

  async findById(id: string) {
    const gymFound = this.gyms.find((gym) => gym.id === id)

    return gymFound || null
  }

  async create({
    name,
    description,
    phone,
    latitude,
    longitude,
  }: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: randomUUID(),
      name,
      description: description || null,
      phone: phone || null,
      latitude: new Decimal(latitude.toString()),
      longitude: new Decimal(longitude.toString()),
    }

    this.gyms.push(gym)

    return gym
  }
}
