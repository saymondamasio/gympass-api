import { Gym, Prisma } from '@prisma/client'
import { prisma } from '~/lib/prisma'
import { GymsRepository } from '../gyms-repository'

export class PrismaGymRepository implements GymsRepository {
  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }
}
