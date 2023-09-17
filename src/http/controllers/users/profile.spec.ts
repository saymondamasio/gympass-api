import request from 'supertest'
import { app } from '~/app'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get profile', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    const responseAuth = await request(app.server).post('/sessions').send({
      email: 'john@example.com',
      password: '123456',
    })

    const token = responseAuth.body.token

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    console.log(response.body)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        email: 'john@example.com',
      }),
    )
  })
})
