import { EnrollmentUseCase } from './enrollment'
import { SaveAddressRepository, SaveEnrollmentRepository, SaveStudentRepository } from '@/application/contracts'
import MockDate from 'mockdate'
import { SaveAccessDataRepository } from '../contracts/access-repository'
import { SendMail } from '@/application/contracts/mail'

const studentRepository: jest.Mocked<SaveStudentRepository> = {
  save: jest.fn()
}

const addressRepository: jest.Mocked<SaveAddressRepository> = {
  save: jest.fn()
}

const enrollmentRepository: jest.Mocked<SaveEnrollmentRepository> = {
  save: jest.fn()
}

const accessRepository: jest.Mocked<SaveAccessDataRepository> = {
  saveAccess: jest.fn()
}

const mailService: jest.Mocked<SendMail> = {
  send: jest.fn()
}

describe('Enrollment', () => {
  let input: EnrollmentUseCase.Input
  let sut: EnrollmentUseCase

  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new EnrollmentUseCase(studentRepository, addressRepository, enrollmentRepository, accessRepository, mailService)
    input = {
      student: {
        id: 'anyStudentId',
        name: 'Filipe Siqueira',
        email: 'filipe@gmail.com',
        document: '55139108020',
        phone: '32999632536'
      },
      address: {
        id: 'anyAddressId',
        studentId: 'anyStudentId',
        cep: 'anyCep',
        street: 'anyStreet',
        number: 'anyNumber',
        complement: '',
        district: 'anyDistrict',
        city: 'anyCity',
        state: 'anyState'
      },
      enrollment: {
        id: 'anyEnrollmentId',
        studentId: 'anyStudentId',
        status: 'active'
      },
      accessData: {
        id: 'anyAccessId',
        email: 'filipe@gmail.com',
        password: 'anyEnrollmentId@55139108020',
        status: 'active'
      }
    }
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should call StudentRepository.save once and with correct values', async () => {
    await sut.execute(input)

    expect(studentRepository.save).toHaveBeenCalledTimes(1)
    expect(studentRepository.save).toHaveBeenCalledWith({
      id: 'anyStudentId',
      name: 'Filipe Siqueira',
      email: 'filipe@gmail.com',
      document: '55139108020',
      phone: '32999632536',
      created_at: new Date()
    })
  })

  test('should call AddressRepository.save once and with correct values', async () => {
    await sut.execute(input)

    expect(addressRepository.save).toHaveBeenCalledTimes(1)
    expect(addressRepository.save).toHaveBeenCalledWith({
      id: 'anyAddressId',
      studentId: 'anyStudentId',
      cep: 'anyCep',
      street: 'anyStreet',
      number: 'anyNumber',
      complement: '',
      district: 'anyDistrict',
      city: 'anyCity',
      state: 'anyState',
      created_at: new Date()
    })
  })

  test('should call EnrollmentRepository.save once and with correct values', async () => {
    await sut.execute(input)

    expect(enrollmentRepository.save).toHaveBeenCalledTimes(1)
    expect(enrollmentRepository.save).toHaveBeenCalledWith({
      id: 'anyEnrollmentId',
      studentId: 'anyStudentId',
      status: 'active',
      created_at: new Date(),
      updated_at: null
    })
  })

  test('should call SaveAccessRepository.save once and with correct values', async () => {
    await sut.execute(input)

    expect(accessRepository.saveAccess).toHaveBeenCalledTimes(1)
    expect(accessRepository.saveAccess).toHaveBeenCalledWith({
      id: 'anyAccessId',
      email: 'filipe@gmail.com',
      password: 'anyEnrollmentId@55139108020',
      status: 'active',
      created_at: new Date(),
      last_access: null
    })
  })

  test('should call MailService.send once and with correct values', async () => {
    await sut.execute(input)

    expect(mailService.send).toHaveBeenCalledTimes(1)
    expect(mailService.send).toHaveBeenCalledWith({
      to: {
        name: 'Filipe Siqueira',
        address: 'filipe@gmail.com'
      },
      from: {
        name: 'Sistema de Matrículas',
        address: 'sistema@mail.com'
      },
      subject: 'Pagamento confirmado',
      html: 'Seu pagamento foi confirmado e o acesso ao nosso portal está liberado. Para acessar, acesse este <a href= "http://localhost:8080/acesso">link</a>. Seu login e senha são seu CPF'
    })
  })
})
