import { SaveAddressRepository, SaveEnrollmentRepository, SaveStudentRepository } from '@/application/contracts'
import { Address } from '@/domain/entities/address'
import { Enrollment } from '@/domain/entities/enrollment'
import { Student } from '@/domain/entities/student'
import { SaveAccessDataRepository } from '@/application/contracts/access-repository'
import { SendMail } from '@/application/contracts/mail'
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

    const accessData: SaveAccessDataRepository.Input = this.makeAccessDataInput(input.accessData)
    await this.accessRepository.saveAccess(accessData)

    const mailData: SendMail.Input = this.makeMailDataInput(input.student)
    await this.mailService.send(mailData)
  }

  private makeAccessDataInput (input: {id: string, email: string, password: string, status: string}): SaveAccessDataRepository.Input {
    return {
      id: input.id,
      email: input.email,
      password: input.password,
      status: input.status,
      created_at: new Date(),
      last_access: null
    }
  }

  private makeMailDataInput (input: { name: string, email: string }): SendMail.Input {
    return {
      to: {
        name: input.name,
        address: input.email
      },
      from: {
        name: constants.mailConfig.from.name,
        address: constants.mailConfig.from.address
      },
      subject: constants.mailConfig.enrollment.subject,
      html: constants.mailConfig.enrollment.html
    }
  }
}

export namespace EnrollmentUseCase {
  export type Input = {
    student: Student.Input
    address: Address.Input
    enrollment: Enrollment.Input
    accessData: {
      id: string
      email: string
      password: string
      status: string
    }
  }
}
