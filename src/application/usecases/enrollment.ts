import { SaveStudentRepository } from '@/application/contracts/student-repository'
import { Student, StudentInput } from '@/domain/entities/student'

export class EnrollmentUseCase {
  constructor (
    private readonly studentRepository: SaveStudentRepository
  ) {

  }

  async execute (input: StudentInput): Promise<void> {
    const student = new Student(input)
    await this.studentRepository.save(student)
  }
}
