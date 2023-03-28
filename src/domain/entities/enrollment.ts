export type EnrollmentInput = {
  id: string
  studentId: string
  status: 'active' | 'inactive'
}

export class Enrollment {
  public readonly id: string
  public readonly studentId: string
  public readonly status: 'active' | 'inactive'
  public readonly created_at: Date
  public readonly updated_at: Date

  constructor (input: EnrollmentInput) {
    Object.assign(this, input)
    this.created_at = new Date()
    this.updated_at = null
  }
}
