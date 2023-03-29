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
