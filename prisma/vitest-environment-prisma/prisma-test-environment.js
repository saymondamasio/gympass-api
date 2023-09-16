import 'dotenv/config'

import { randomUUID } from 'crypto'
import { execSync } from 'node:child_process'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDatabaseURL(schema) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined')
  }

  const databaseURL = new URL(process.env.DATABASE_URL)

  databaseURL.searchParams.set('schema', schema)

  return databaseURL.toString()
}

export default {
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()

    const databaseURL = generateDatabaseURL(schema)
    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
