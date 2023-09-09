import { InMemoryCheckInsRepository } from '~/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsInUseCase } from './get-user-metrics'
import { expect } from 'vitest'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let getUserMetricsInUseCase: GetUserMetricsInUseCase

describe('Fetch User Use Case', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    getUserMetricsInUseCase = new GetUserMetricsInUseCase(
      inMemoryCheckInsRepository,
    )
  })

  it('should be able to get check ins count', async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: 'gym_01',
      user_id: 'user_id',
    })

    await inMemoryCheckInsRepository.create({
      gym_id: 'gym_02',
      user_id: 'user_id',
    })

    const { checkInsCount } = await getUserMetricsInUseCase.execute({
      userId: 'user_id',
    })

    expect(checkInsCount).toEqual(2)
  })
})
