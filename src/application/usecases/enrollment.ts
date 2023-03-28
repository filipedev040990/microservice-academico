import { SaveStudentRepository } from '@/application/contracts/student-repository'
import { Student, StudentInput } from '@/domain/entities/student'

export class EnrollmentUseCase {
  constructor (
    private readonly studentRepository: SaveStudentRepository
  ) {

  }

  async execute (input: EnrollmentUseCase.Input): Promise<void> {
    const student = new Student(input.student)
    await this.studentRepository.save(student)
  }
}

export namespace EnrollmentUseCase {
  export type Input = {
    student: StudentInput
  }
}
