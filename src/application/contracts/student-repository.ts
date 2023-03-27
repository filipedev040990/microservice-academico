export interface SaveStudentRepository {
  save(input: SaveStudentRepository.Input): Promise<void>
}

export namespace SaveStudentRepository {
  export type Input = {
    id: string
    name: string
    email: string
    document: string
    phone: string
    created_at: Date
  }
}
