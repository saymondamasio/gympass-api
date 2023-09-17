import { InMemoryGymsRepository } from '~/repositories/in-memory/in-memory-gyms-repository'
import { Gym } from '@prisma/client'
import { expect } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let inMemoryGymsInsRepository: InMemoryGymsRepository
let fetchNearbyGymsUseCase: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    inMemoryGymsInsRepository = new InMemoryGymsRepository()
    fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(
      inMemoryGymsInsRepository,
    )
  })

  it('should be able to fetch nearby gyms', async () => {
    // gym nearby
    await inMemoryGymsInsRepository.create({
      name: 'Near Gym 1',
      latitude: -21.304138,
      longitude: -46.72742,
    })
    // gym nearby
    await inMemoryGymsInsRepository.create({
      name: 'Near Gym 2',
      latitude: -21.303835,
      longitude: -46.727852,
    })

    // gym far away
    await inMemoryGymsInsRepository.create({
      name: 'Far Gym',
      latitude: -21.303352,
      longitude: -46.728904,
    })

    const { gyms } = await fetchNearbyGymsUseCase.execute({
      userLatitude: -21.303973,
      userLongitude: -46.727655,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Near Gym 1' }),
      expect.objectContaining({ name: 'Near Gym 2' }),
    ])
  })
})
