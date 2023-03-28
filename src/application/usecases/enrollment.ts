import { SaveAddressRepository, SaveEnrollmentRepository, SaveStudentRepository } from '@/application/contracts'
import { Address, AddressInput } from '@/domain/entities/address'
import { Enrollment, EnrollmentInput } from '@/domain/entities/enrollment'
import { Student, StudentInput } from '@/domain/entities/student'

export class EnrollmentUseCase {
  constructor (
    private readonly studentRepository: SaveStudentRepository,
    private readonly addressRepository: SaveAddressRepository,
    private readonly enrollmentRepository: SaveEnrollmentRepository
  ) {

  }

  async execute (input: EnrollmentUseCase.Input): Promise<void> {
    const student = new Student(input.student)
    await this.studentRepository.save(student)

    const address = new Address(input.address)
    await this.addressRepository.save(address)

    const enrollment = new Enrollment(input.enrollment)
    await this.enrollmentRepository.save(enrollment)
  }
}

export namespace EnrollmentUseCase {
  export type Input = {
    student: StudentInput
    address: AddressInput
    enrollment: EnrollmentInput
  }
}
