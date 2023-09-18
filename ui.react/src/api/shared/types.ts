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

interface genericTemplate {
  errorMessage: string | null
  success: boolean
}

interface genericApiDataResponse<T> extends genericTemplate {
  data: T | null
}

interface genericApiTokenResponse extends genericTemplate {
  type?: string
  accessToken?: string
  expires?: number
}

interface genericApiRequestArgs<T> {
  payload: T
  auth?: string
  varRoute?: string
  callback?: () => void
}

export type {
  genericTemplate,
  genericApiRequestArgs,
  genericApiTokenResponse,
  genericApiDataResponse,
}
