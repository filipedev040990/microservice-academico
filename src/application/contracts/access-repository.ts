export interface SaveAccessDataRepository {
  saveAccess(input: SaveAccessDataRepository.Input): Promise<void>
}

export namespace SaveAccessDataRepository {
  export type Input = {
    id: string
    email: string
    password: string
    status: string
    created_at: Date
    last_access: Date
  }
}
