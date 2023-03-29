export class Student {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly document: string
  public readonly phone: string
  public created_at: Date

  constructor (input: Student.Input) {
    Object.assign(this, input)
    this.created_at = new Date()
  }
}

export namespace Student {
  export type Input = {
    id: string
    name: string
    email: string
    document: string
    phone: string
  }
}
