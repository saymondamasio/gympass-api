import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserProfileUseCase } from '~/use-cases/factories/get-user-profile-use-case'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({
    onlyCookie: true,
  })

  const userUseCase = makeGetUserProfileUseCase()

  const { user } = await userUseCase.execute({ id: request.user.sub })

  const token = await reply.jwtSign(
    {
      role: user.role,
    },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: true,
    })
    .status(200)
    .send({ token })
}
