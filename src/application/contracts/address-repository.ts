export interface SaveAddressRepository {
  save(input: SaveAddressRepository.Input): Promise<void>
}

export namespace SaveAddressRepository {
  export type Input = {
    id: string
    studentId: string
    cep: string
    street: string
    number: string
    complement?: string
    district: string
    city: string
    state: string
    created_at: Date
  }
}
