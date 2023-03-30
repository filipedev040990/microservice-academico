import { EnrollmentUseCase } from '@/application/usecases/enrollment'
import { MailService } from '@/infra/adapters/mail/mailTrap'
import { AccessRepository } from '@/infra/database/repositories/access'
import { AddressRepository } from '@/infra/database/repositories/address'
import { EnrollmentsRepository } from '@/infra/database/repositories/enrollments'
import { StudentRepository } from '@/infra/database/repositories/student'

export const makeEnrollmentUseCaseFactory = (): EnrollmentUseCase => {
  const studentRepository = new StudentRepository()
  const addressRepository = new AddressRepository()
  const enrollmentRepository = new EnrollmentsRepository()
  const accessRepository = new AccessRepository()
  const mailService = new MailService()
  return new EnrollmentUseCase(studentRepository, addressRepository, enrollmentRepository, accessRepository, mailService)
}
