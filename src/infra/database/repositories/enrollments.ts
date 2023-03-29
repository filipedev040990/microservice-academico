import { SaveEnrollmentRepository } from '@/application/contracts'
import { prismaClient } from '../prisma-client'

export class EnrollmentsRepository implements SaveEnrollmentRepository {
  async save (input: SaveEnrollmentRepository.Input): Promise<void> {
    await prismaClient.enrollment.create({
      data: {
        id: input.id,
        student_id: input.studentId,
        status: input.status,
        created_at: input.created_at,
        updated_at: input.updated_at
      }
    })
  }
}
