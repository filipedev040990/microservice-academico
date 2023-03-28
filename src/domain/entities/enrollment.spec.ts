import MockDate from 'mockdate'
import { Enrollment, EnrollmentInput } from './enrollment'

describe('Enrollment', () => {
  let input: EnrollmentInput
  beforeAll(() => {
    MockDate.set(new Date())
    input = {
      id: 'anyId',
      studentId: 'anyStudentId',
      status: 'active'
    }
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should create an instance of Enrollment correctly', () => {
    const enrollment = new Enrollment(input)

    expect(enrollment.id).toBe('anyId')
    expect(enrollment.studentId).toBe('anyStudentId')
    expect(enrollment.status).toBe('active')
    expect(enrollment.created_at).toEqual(new Date())
    expect(enrollment.updated_at).toBeNull()
  })
})
