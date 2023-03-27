import { Student, StudentInput } from '@/domain/entities/student'
import MockDate from 'mockdate'

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

export interface SaveStudentRepository {
  save(input: SaveStudentRepository.Input): Promise<void>
}

export namespace SaveStudentRepository {
  export type Input = {
    id: string
    name: string
    email: string
    document: string
    phone: string
    created_at: Date
  }
}

const studentRepository: jest.Mocked<SaveStudentRepository> = {
  save: jest.fn()
}

describe('Enrollment', () => {
  let input: any
  beforeAll(() => {
    MockDate.set(new Date())
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
    const sut = new EnrollmentUseCase(studentRepository)

    await sut.execute(input.student)

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
