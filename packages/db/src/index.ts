import { PrismaClient } from '../generated/client'
const prisma = new PrismaClient()

export * from '../generated/client'

export default prisma
