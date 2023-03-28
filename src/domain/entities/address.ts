export type AddressInput = {
  id: string
  studentId: string
  cep: string
  street: string
  number: string
  complement: string
  district: string
  city: string
  state: string
}

export class Address {
  public readonly id: string
  public readonly studentId: string
  public readonly cep: string
  public readonly street: string
  public readonly number: string
  public readonly complement: string
  public readonly district: string
  public readonly city: string
  public readonly state: string
  public readonly created_at: Date

  constructor (input: AddressInput) {
    Object.assign(this, input)
    this.created_at = new Date()
  }
}
