import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  async save(data: CheckIn) {
    const checkInIndex = this.checkIns.findIndex(
      (checkIn) => checkIn.id === data.id,
    )

    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = data
    }

    return data
  }

  private checkIns: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {
    const dateCompare = dayjs(date)

    const checkInOnSameDate = this.checkIns.find(
      (checkIn) =>
        checkIn.user_id === userId &&
        dateCompare.diff(checkIn.created_at, 'hours') < 24,
    )

    return checkInOnSameDate || null
  }

  async findById(id: string) {
    const checkIn = this.checkIns.find((checkIn) => checkIn.id === id)

    return checkIn || null
  }

  async findManyByUserId(userId: string, page = 1) {
    return this.checkIns
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string) {
    return this.checkIns.filter((checkIn) => checkIn.user_id === userId).length
  }

  async create({
    gym_id,
    user_id,
    validated_at,
  }: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id,
      gym_id,
      validated_at: validated_at ? new Date(validated_at) : null,
      created_at: new Date(),
    }

    this.checkIns.push(checkIn)

    return checkIn
  }
}
