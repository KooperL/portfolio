import { ApiEndpoints, forumPath, projectPath } from './types';
import { environmentConfig } from './environmentMappings';

const { apiHost } = environmentConfig();

export const endpoints: ApiEndpoints = {
  home: `${apiHost}/home`,
  about: `${apiHost}/about`,
  contact: `${apiHost}/contact`,
  monitor: `${apiHost}/monitor`,
  capture: `${apiHost}/capture`,
  track: `${apiHost}/track`,
  logsInsert: `${apiHost}/logs/insert`,
  logsPull: `${apiHost}/logs/pull`,

  projects: `${apiHost}/${projectPath}`,
  mrna: `${apiHost}/${projectPath}/mrna`,
  seqalign: `${apiHost}/${projectPath}/seqalign`,
  render: `${apiHost}/${projectPath}/render`,
  secondary: `${apiHost}/${projectPath}/secondary`,
  fuelprices: `${apiHost}/${projectPath}/fuelprices`,
  tictactoe: `${apiHost}/${projectPath}/tictactoe`,
  randombio: `${apiHost}/${projectPath}/randombio`,
  property: `${apiHost}/${projectPath}/property`,

  forumHome: `${apiHost}/${forumPath}`,
  forumRegister: `${apiHost}/${forumPath}/register`,
  forumPostCreate: `${apiHost}/${forumPath}/post`,
  forumPost: `${apiHost}/${forumPath}/post/`,
  forumUser: `${apiHost}/${forumPath}/user/`,
  forumLogin: `${apiHost}/${forumPath}/login`,
  forumRefresh: `${apiHost}/${forumPath}/refresh`,
  forumLogout: `${apiHost}/${forumPath}/logout`,
}

