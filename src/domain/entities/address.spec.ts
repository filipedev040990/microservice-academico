import { Address, AddressInput } from './address'

describe('Address', () => {
  let input: AddressInput
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
