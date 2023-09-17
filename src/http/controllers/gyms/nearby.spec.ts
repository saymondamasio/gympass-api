import request from 'supertest'
import { app } from '~/app'
import { createAndAuthenticateUser } from '~/utils/test/create-and-authenticate-user'

describe('Nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search nearby gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    // Nearby Gym
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Gym 1',
        description: 'Description Gym 1',
        phone: '123456789',
        latitude: -21.304138,
        longitude: -46.72742,
      })

    // Nearby Gym
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Gym 2',
        description: 'Description Gym 2',
        phone: '123456789',
        latitude: -21.303835,
        longitude: -46.727852,
      })

    // Far way Gym
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Gym 3',
        description: 'Description Gym 3',
        phone: '123456789',
        latitude: -21.303352,
        longitude: -46.728904,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .set('Authorization', `Bearer ${token}`)
      .query({
        latitude: -21.303973,
        longitude: -46.727655,
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(2)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: 'Gym 1',
      }),
      expect.objectContaining({
        name: 'Gym 2',
      }),
    ])
  })
})
