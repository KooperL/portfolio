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

}
