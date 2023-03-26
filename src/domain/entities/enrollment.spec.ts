import MockDate from 'mockdate'

export class Enrollment {
  public readonly id: string
  public readonly studentId: string
  public readonly status: 'active' | 'inactive'
  public readonly created_at: Date
  public readonly updated_at: Date

  constructor (input: Enrollment.Input) {
    Object.assign(this, input)
    this.created_at = new Date()
    this.updated_at = null
  }
}

export namespace Enrollment {
  export type Input = {
    id: string
    studentId: string
    status: 'active' | 'inactive'
  }
}

describe('Enrollment', () => {
  let input: Enrollment.Input
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
