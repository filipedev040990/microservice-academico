import { SaveAccessDataRepository } from '@/application/contracts/access-repository'
import { prismaClient } from '../prisma-client'

export class AccessRepository implements SaveAccessDataRepository {
  async saveAccess (input: SaveAccessDataRepository.Input): Promise<void> {
    await prismaClient.access.create({
      data: {
        id: input.id,
        email: input.email,
        password: input.password,
        status: input.status,
        created_at: input.created_at,
        last_access: input.last_access
      }
    })
  }
}
