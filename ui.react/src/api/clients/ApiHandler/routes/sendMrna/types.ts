export interface MrnaResponse {
  dna_field: string
  mrna_field: string
  rdna_field: string
  simplecount: {
    a: number
    t: number
    g: number
    c: number
  }
  gccontent: number
  aa: string
  aa_s: string
  molweight: number
  tm: number
}

export interface MrnaRequest {
  dna_field_id: string
}
