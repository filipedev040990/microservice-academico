import { SaveAddressRepository } from '@/application/contracts'
import { prismaClient } from '../prisma-client'

export class AddressRepository implements SaveAddressRepository {
  async save (input: SaveAddressRepository.Input): Promise<void> {
    await prismaClient.address.create({
      data: {
        id: input.id,
        student_id: input.studentId,
        cep: input.cep,
        street: input.street,
        district: input.district,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        created_at: input.created_at,
        updated_at: null
      }
    })
  }
}
