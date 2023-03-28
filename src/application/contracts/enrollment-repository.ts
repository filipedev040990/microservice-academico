export interface SaveEnrollmentRepository {
  save(input: SaveEnrollmentRepository.Input): Promise<void>
}

export namespace SaveEnrollmentRepository {
  export type Input = {
    id: string
    studentId: string
    status: string
    created_at: Date
    updated_at: Date
  }
}
