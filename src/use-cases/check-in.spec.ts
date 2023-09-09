import { InMemoryGymsRepository } from '~/repositories/in-memory/in-memory-gyms-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '~/repositories/in-memory/in-memory-check-ins-repository'
import { Gym } from '@prisma/client'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let inMemoryGymsInsRepository: InMemoryGymsRepository
let checkInUseCase: CheckInUseCase
let gym: Gym

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    inMemoryGymsInsRepository = new InMemoryGymsRepository()
    checkInUseCase = new CheckInUseCase(
      inMemoryCheckInsRepository,
      inMemoryGymsInsRepository,
    )

    gym = await inMemoryGymsInsRepository.create({
      name: 'Javascript Gym',
      latitude: 0,
      longitude: 0,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      gymId: gym.id,
      userId: 'user_id',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to do more than one check in on the same day', async () => {
    const date = new Date(2023, 1, 1)
    vi.setSystemTime(date)

    await checkInUseCase.execute({
      gymId: gym.id,
      userId: 'user_id',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(
      checkInUseCase.execute({
        gymId: gym.id,
        userId: 'user_id',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check in to distance gym', async () => {
    const gymFarAway = await inMemoryGymsInsRepository.create({
      name: 'Javascript Gym',
      latitude: -21.2973321,
      longitude: -46.6922911,
    })

    await expect(
      checkInUseCase.execute({
        gymId: gymFarAway.id,
        userId: 'user_id',
        userLatitude: -21.303972,
        userLongitude: -46.727658,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in to distance gym', async () => {
    const gymFarAway = await inMemoryGymsInsRepository.create({
      name: 'Javascript Gym',
      latitude: -21.3039478,
      longitude: -46.7276572,
    })

    await expect(
      checkInUseCase.execute({
        gymId: gymFarAway.id,
        userId: 'user_id',
        userLatitude: -21.30422,
        userLongitude: -46.727349,
      }),
    ).resolves.toBeTruthy()
  })
})
