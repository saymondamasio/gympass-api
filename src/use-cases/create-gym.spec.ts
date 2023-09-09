import { InMemoryGymsRepository } from '~/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let inMemoryGymsRepository: InMemoryGymsRepository
let createGymUseCase: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    createGymUseCase = new CreateGymUseCase(inMemoryGymsRepository)
  })

  it('should be to create gym', async () => {
    const { gym } = await createGymUseCase.execute({
      name: 'any_name',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
