import { InMemoryUsersRepository } from '~/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let getUserProfileUseCase: GetUserProfileUseCase

describe('Get User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    getUserProfileUseCase = new GetUserProfileUseCase(inMemoryUsersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'any_name',
      email: 'any_email@email.com',
      password_hash: 'any_password',
    })

    const { user } = await getUserProfileUseCase.execute({
      id: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('any_name')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(
      getUserProfileUseCase.execute({
        id: 'any_id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
