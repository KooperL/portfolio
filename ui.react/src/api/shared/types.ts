import { ApiError } from "../apiErrorHandler"

export const forumPath = "forum"
export const projectPath = "projects"

export interface ApiEndpoints {
  contact: string
  capture: string
  monitor: string
  track: string
  logsInsert: string
  logsPull: string
  property: string
  propertySearch: string
  mrna: string
  seqalign: string
  siteanalysis: string
  render: string
  fuelprices: string
  secondary: string
  tictactoe: string
  randombio: string
  forumHome: string
  // forumSearch: string;
  forumPostCreate: string
  forumLogin: string
  forumPost: string
  forumUser: string
  forumRegister: string
  forumRefresh: string
  forumLogout: string
}

// export interface GenericResponse<T, U extends string | ApiError> {
//   data: (T | null)
//   success: boolean
//   error: (U | null)
// }

interface genericApiResponse<T> {
  success: boolean,
  data: T | null,
  errorMessage: string | null,
}

export type {
  genericApiResponse
}
