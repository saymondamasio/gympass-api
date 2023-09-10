import { InMemoryGymsRepository } from '~/repositories/in-memory/in-memory-gyms-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '~/repositories/in-memory/in-memory-check-ins-repository'
import { Gym } from '@prisma/client'
import { MaxNumberOfCheckInsError } from './errors/max-numbers-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'
import { SearchGymsUseCase } from './search-gyms'
import { expect } from 'vitest'

let inMemoryGymsInsRepository: InMemoryGymsRepository
let searchGymsUseCase: SearchGymsUseCase
let gym: Gym

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    inMemoryGymsInsRepository = new InMemoryGymsRepository()
    searchGymsUseCase = new SearchGymsUseCase(inMemoryGymsInsRepository)
  })

  it('should be able to search for gyms', async () => {
    await inMemoryGymsInsRepository.create({
      name: 'Gym 1',
      latitude: 0,
      longitude: 0,
    })
    await inMemoryGymsInsRepository.create({
      name: 'Gym 2',
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await searchGymsUseCase.execute({ query: 'Gym 1' })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Gym 1' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    Array.from({ length: 22 }).forEach(async (_, i) => {
      await inMemoryGymsInsRepository.create({
        name: `Gym ${i + 1}`,
        latitude: 0,
        longitude: 0,
      })
    })

    const { gyms } = await searchGymsUseCase.execute({ query: 'Gym', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Gym 21' }),
      expect.objectContaining({ name: 'Gym 22' }),
    ])
  })
})
