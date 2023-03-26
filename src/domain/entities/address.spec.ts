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

  constructor (input: Address.Input) {
    Object.assign(this, input)
    this.created_at = new Date()
  }
}

export namespace Address {
  export type Input = {
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
}

describe('Address', () => {
  let input: Address.Input
  beforeAll(() => {
    input = {
      id: 'anyId',
      studentId: 'anyStudentId',
      cep: 'anyCep',
      street: 'anyStreet',
      number: 'anyNumber',
      complement: 'anyComplement',
      district: 'anyDistrict',
      city: 'anyCity',
      state: 'anyState'
    }
  })
  test('should create an instance of Address correctly', () => {
    const address = new Address(input)

    expect(address.id).toBe('anyId')
    expect(address.studentId).toBe('anyStudentId')
    expect(address.cep).toBe('anyCep')
    expect(address.street).toBe('anyStreet')
    expect(address.number).toBe('anyNumber')
    expect(address.complement).toBe('anyComplement')
    expect(address.district).toBe('anyDistrict')
    expect(address.city).toBe('anyCity')
    expect(address.state).toBe('anyState')
  })
})
