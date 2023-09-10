import { InMemoryCheckInsRepository } from '~/repositories/in-memory/in-memory-check-ins-repository'
import { Gym } from '@prisma/client'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let validateCheckInUseCase: ValidateCheckInUseCase
let gym: Gym

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    validateCheckInUseCase = new ValidateCheckInUseCase(
      inMemoryCheckInsRepository,
    )

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate check-in', async () => {
    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gym_id: 'gym_01',
      user_id: 'user_id',
    })

    const { checkIn } = await validateCheckInUseCase.execute({
      checkId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an ine check-in', async () => {
    await expect(
      validateCheckInUseCase.execute({
        checkId: 'invalid_id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes after of creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 10, 0, 0))

    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gym_id: 'gym_01',
      user_id: 'user_id',
    })

    // 20 minutes
    vi.advanceTimersByTime(21 * 60 * 1000)

    await expect(
      validateCheckInUseCase.execute({
        checkId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
