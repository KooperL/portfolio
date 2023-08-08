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

interface genericApiDataResponse<T> {
  success: boolean,
  data: T | null,
  errorMessage: string | null,
}

interface genericApiRequestArgs<T> {
  payload: T
  auth?: string
  varRoute?: string 
  callback?: () => void
}
interface genericApiTokenResponse {
  success: boolean
  type?: string
  accessToken?: string
  expires?: number
  error?: string
}

export type {
  genericApiRequestArgs,
  genericApiTokenResponse,
  genericApiDataResponse
}
