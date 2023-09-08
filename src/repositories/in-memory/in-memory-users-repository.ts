import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = []

  async create({
    email,
    name,
    password_hash,
  }: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: '1',
      name,
      email,
      password_hash,
      created_at: new Date(),
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const userFound = this.users.find((user) => user.email === email)

    return userFound || null
  }
}
