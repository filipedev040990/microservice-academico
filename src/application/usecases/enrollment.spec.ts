import { SaveStudentRepository } from '@/application/contracts/student-repository'
import MockDate from 'mockdate'
import { EnrollmentUseCase } from './enrollment'

const studentRepository: jest.Mocked<SaveStudentRepository> = {
  save: jest.fn()
}

describe('Enrollment', () => {
  let input: EnrollmentUseCase.Input
  let sut: EnrollmentUseCase
  beforeAll(() => {
    MockDate.set(new Date())
    sut = new EnrollmentUseCase(studentRepository)
    input = {
      student: {
        id: 'anyStudentId',
        name: 'Filipe Siqueira',
        email: 'filipe@gmail.com',
        document: '55139108020',
        phone: '32999632536'
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
})
