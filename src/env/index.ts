import { config } from 'dotenv'

import { z } from 'zod'

if (process.env.NODE_ENV) {
  config({ path: `.env.${process.env.NODE_ENV}` })
} else {
  config()
}

const envSchema = z.object({
  PORT: z.number().default(3333),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid variables', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data
