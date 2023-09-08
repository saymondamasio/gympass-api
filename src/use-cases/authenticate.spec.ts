import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '~/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(inMemoryUsersRepository)

    await inMemoryUsersRepository.create({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password_hash: await hash('any_password', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'any_email@gmail.com',
      password: 'any_password',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(inMemoryUsersRepository)

    await expect(
      authenticateUseCase.execute({
        email: 'any_email@gmail.com',
        password: 'any_password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(inMemoryUsersRepository)

    await inMemoryUsersRepository.create({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password_hash: await hash('any_password', 6),
    })

    await expect(
      authenticateUseCase.execute({
        email: 'any_email@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
