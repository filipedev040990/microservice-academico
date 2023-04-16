import { HashGenerate } from '@/application/contracts/criptography'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements HashGenerate {
  constructor (private readonly salt: number) {}
  async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }
}
