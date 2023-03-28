import { EnrollmentUseCase } from './enrollment'
import { SaveAddressRepository, SaveStudentRepository } from '@/application/contracts'
import MockDate from 'mockdate'

const studentRepository: jest.Mocked<SaveStudentRepository> = {
  save: jest.fn()
}

const addressRepository: jest.Mocked<SaveAddressRepository> = {
  save: jest.fn()
}

describe('Enrollment', () => {
  let input: EnrollmentUseCase.Input
  let sut: EnrollmentUseCase

  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new EnrollmentUseCase(studentRepository, addressRepository)
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
})
