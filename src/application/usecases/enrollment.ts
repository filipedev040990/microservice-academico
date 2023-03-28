import { SaveAddressRepository, SaveStudentRepository } from '@/application/contracts'
import { Address, AddressInput } from '@/domain/entities/address'
import { Student, StudentInput } from '@/domain/entities/student'

export class EnrollmentUseCase {
  constructor (
    private readonly studentRepository: SaveStudentRepository,
    private readonly addressRepository: SaveAddressRepository
  ) {

  }

  async execute (input: EnrollmentUseCase.Input): Promise<void> {
    const student = new Student(input.student)
    await this.studentRepository.save(student)

    const address = new Address(input.address)
    await this.addressRepository.save(address)
  }
}

export namespace EnrollmentUseCase {
  export type Input = {
    student: StudentInput
    address: AddressInput
  }
}
