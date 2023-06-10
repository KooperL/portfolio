import {
  ApiEndpoints,
  CmsEndpoints,
  cmsPath,
  forumPath,
  projectPath,
} from "./types"
import { environmentConfig } from "./environmentMappings"

const { apiHost } = environmentConfig()

export const endpoints: {
  [k in keyof ApiEndpoints | keyof CmsEndpoints]: string
} = {
  contact: `${apiHost}/contact`,
  monitor: `${apiHost}/monitor`,
  capture: `${apiHost}/capture`,
  track: `${apiHost}/track`,
  logsInsert: `${apiHost}/logs/insert`,
  logsPull: `${apiHost}/logs/pull`,

  mrna: `${apiHost}/${projectPath}/mrna`,
  seqalign: `${apiHost}/${projectPath}/seqalign`,
  siteanalysis: `${apiHost}/${projectPath}/siteanalysis`,
  render: `${apiHost}/${projectPath}/render`,
  secondary: `${apiHost}/${projectPath}/secondary`,
  fuelprices: `${apiHost}/${projectPath}/fuelprices`,
  tictactoe: `${apiHost}/${projectPath}/tictactoe`,
  randombio: `${apiHost}/${projectPath}/randombio`,
  property: `${apiHost}/${projectPath}/property`,
  propertySearch: `${apiHost}/${projectPath}/property/search`,

  forumHome: `${apiHost}/${forumPath}`,
  forumRegister: `${apiHost}/${forumPath}/register`,
  forumPostCreate: `${apiHost}/${forumPath}/post`,
  forumPost: `${apiHost}/${forumPath}/post/`,
  forumUser: `${apiHost}/${forumPath}/user/`,
  forumLogin: `${apiHost}/${forumPath}/login`,
  forumRefresh: `${apiHost}/${forumPath}/refresh`,
  forumLogout: `${apiHost}/${forumPath}/logout`,

  aboutCms: `${apiHost}/${cmsPath}/about`,
  contactCms: `${apiHost}/${cmsPath}/contact`,
  fuelpricesCms: `${apiHost}/${cmsPath}/fuelprices`,
  homeCms: `${apiHost}/${cmsPath}/home`,
  jssimulatorCms: `${apiHost}/${cmsPath}/jssimulator`,
  minesweeperCms: `${apiHost}/${cmsPath}/minesweeper`,
  mrnaCms: `${apiHost}/${cmsPath}/mrna`,
  propertyCms: `${apiHost}/${cmsPath}/property`,
  projectsCms: `${apiHost}/${cmsPath}/projects`,
  randombioCms: `${apiHost}/${cmsPath}/randombio`,
  secondaryCms: `${apiHost}/${cmsPath}/secondary`,
  seqalignCms: `${apiHost}/${cmsPath}/seqalign`,
  tictactoeCms: `${apiHost}/${cmsPath}/tictactoe`,
}
