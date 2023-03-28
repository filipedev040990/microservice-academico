import { SaveAddressRepository, SaveEnrollmentRepository, SaveStudentRepository } from '@/application/contracts'
import { Address, AddressInput } from '@/domain/entities/address'
import { Enrollment, EnrollmentInput } from '@/domain/entities/enrollment'
import { Student, StudentInput } from '@/domain/entities/student'
import { SaveAccessDataRepository } from '../contracts/access-repository'
import { SendMail } from '../contracts/mail'
import constants from '@/application/shared/constants'

export class EnrollmentUseCase {
  constructor (
    private readonly studentRepository: SaveStudentRepository,
    private readonly addressRepository: SaveAddressRepository,
    private readonly enrollmentRepository: SaveEnrollmentRepository,
    private readonly accessRepository: SaveAccessDataRepository,
    private readonly mailService: SendMail
  ) {

  }

  async execute (input: EnrollmentUseCase.Input): Promise<void> {
    const student = new Student(input.student)
    await this.studentRepository.save(student)

    const address = new Address(input.address)
    await this.addressRepository.save(address)

    const enrollment = new Enrollment(input.enrollment)
    await this.enrollmentRepository.save(enrollment)

    const accessData = {
      id: input.accessData.id,
      email: input.accessData.email,
      password: input.accessData.password,
      status: input.accessData.status,
      created_at: new Date(),
      last_access: null
    }

    await this.accessRepository.saveAccess(accessData)

    const mailData: SendMail.Input = {
      to: {
        name: student.name,
        address: student.email
      },
      from: {
        name: constants.mailConfig.from.name,
        address: constants.mailConfig.from.address
      },
      subject: constants.mailConfig.enrollment.subject,
      html: constants.mailConfig.enrollment.html
    }

    await this.mailService.send(mailData)
  }
}

export namespace EnrollmentUseCase {
  export type Input = {
    student: StudentInput
    address: AddressInput
    enrollment: EnrollmentInput
    accessData: {
      id: string
      email: string
      password: string
      status: string
    }
  }
}
