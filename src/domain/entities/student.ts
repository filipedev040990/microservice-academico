export type StudentInput = {
  id: string
  name: string
  email: string
  document: string
  phone: string
}

export class Student {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly document: string
  public readonly phone: string
  public created_at: Date

  constructor (input: StudentInput) {
    Object.assign(this, input)
    this.created_at = new Date()
  }
}
