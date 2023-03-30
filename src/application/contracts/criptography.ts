export interface HashGenerate {
  hash(value: string): Promise<string>
}
