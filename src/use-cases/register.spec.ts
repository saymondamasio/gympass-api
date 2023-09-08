import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '~/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it("should be possible to hash the user's password", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: 'any_password',
    })

    console.log(user.password_hash)

    const isPasswordCorrectlyHashed = await compare(
      'any_password',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with the same email', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const email = 'any_email@gmail.com'

    await registerUseCase.execute({
      name: 'John 1',
      email,
      password: 'password',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John 2',
        email,
        password: 'password2',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not be able to register', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const email = 'any_email@gmail.com'

    const { user } = await registerUseCase.execute({
      name: 'John',
      email,
      password: 'password',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
