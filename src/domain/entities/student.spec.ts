import { Student, StudentInput } from './student'

describe('Student', () => {
  let input: StudentInput

  beforeAll(() => {
    input = {
      id: 'anyStudentId',
      name: 'anyName',
      email: 'anyEmail',
      document: 'anyDocument',
      phone: 'anyPhone'
    }
  })
  test('should create an instance of Student correctly', () => {
    const student = new Student(input)

    expect(student.id).toBe('anyStudentId')
    expect(student.name).toBe('anyName')
    expect(student.email).toBe('anyEmail')
    expect(student.document).toBe('anyDocument')
    expect(student.phone).toBe('anyPhone')
  })
})
