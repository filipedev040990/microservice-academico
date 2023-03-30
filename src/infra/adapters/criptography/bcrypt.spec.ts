import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('anyHash')
}))

export class BcryptAdapter {
  constructor (private readonly salt: number) {}
  async hash (value: string): Promise<string> {
    await bcrypt.hash(value, this.salt)
    return null
  }
}

describe('BcryptAdapter', () => {
  test('should call BcryptAdapter.hash once and with correct values', async () => {
    const spy = jest.spyOn(bcrypt, 'hash')
    const salt = 12
    const sut = new BcryptAdapter(salt)

    await sut.hash('anyValue')

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('anyValue', salt)
  })
})
