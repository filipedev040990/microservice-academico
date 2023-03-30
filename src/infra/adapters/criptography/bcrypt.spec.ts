import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt'

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('anyHash')
}))

describe('BcryptAdapter', () => {
  let sut: BcryptAdapter
  const salt: number = 12
  beforeAll(() => {
    sut = new BcryptAdapter(salt)
  })
  test('should call BcryptAdapter.hash once and with correct values', async () => {
    const spy = jest.spyOn(bcrypt, 'hash')

    await sut.hash('anyValue')

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('anyValue', salt)
  })

  test('should return an hash', async () => {
    const hash = await sut.hash('anyValue')

    expect(hash).toBe('anyHash')
  })
})
