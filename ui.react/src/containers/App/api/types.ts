import { ApiError } from "src/api/apiErrorHandler"

export const forumPath = "forum"
export const projectPath = "projects"
export const cmsPath = "cms"

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

export interface CmsEndpoints {
  aboutCms: string
  contactCms: string
  fuelpricesCms: string
  homeCms: string
  jssimulatorCms: string
  minesweeperCms: string
  mrnaCms: string
  projectsCms: string
  propertyCms: string
  randombioCms: string
  secondaryCms: string
  seqalignCms: string
  tictactoeCms: string
}

export interface emptyPayload {
  success: boolean
}

export interface GenericResponse<T, U extends string | ApiError> {
  data: T | null
  success: boolean
  error: U | null
}
