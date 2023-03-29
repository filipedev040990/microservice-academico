import { SaveStudentRepository } from '@/application/contracts'
import { prismaClient } from '../prisma-client'

export class StudentRepository implements SaveStudentRepository {
  async save (input: SaveStudentRepository.Input): Promise<void> {
    await prismaClient.student.create({
      data: {
        id: input.id,
        name: input.name,
        email: input.email,
        document: input.document,
        phone: input.phone,
        created_at: input.created_at,
        updated_at: null
      }
    })
  }
}
