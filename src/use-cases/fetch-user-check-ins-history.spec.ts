import { InMemoryCheckInsRepository } from '~/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryInUseCase } from './fetch-user-check-ins-history'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let fetchUserCheckInsHistoryUseCase: FetchUserCheckInsHistoryInUseCase

describe('Fetch User Use Case', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryInUseCase(
      inMemoryCheckInsRepository,
    )
  })

  it('should be able to list check ins history', async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: 'gym_01',
      user_id: 'user_id',
    })

    await inMemoryCheckInsRepository.create({
      gym_id: 'gym_02',
      user_id: 'user_id',
    })

    const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
      userId: 'user_id',
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym_01',
      }),
      expect.objectContaining({
        gym_id: 'gym_02',
      }),
    ])
  })

  it('should be able to list paginated check-in history', async () => {
    Array.from({ length: 22 }).forEach((_, index) => {
      inMemoryCheckInsRepository.create({
        gym_id: `gym_${index + 1}`,
        user_id: 'user_id',
      })
    })

    const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
      userId: 'user_id',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym_21',
      }),
      expect.objectContaining({
        gym_id: 'gym_22',
      }),
    ])
  })
})
