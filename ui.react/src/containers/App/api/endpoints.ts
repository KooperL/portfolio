import { ApiEndpoints, blogPath, projectPath } from './types';
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

  blogHome: `${apiHost}/${blogPath}`,
  blogRegister: `${apiHost}/${blogPath}/register`,
  blogPostCreate: `${apiHost}/${blogPath}/post`,
  blogPost: `${apiHost}/${blogPath}/post/`,
  blogUser: `${apiHost}/${blogPath}/user/`,
  blogLogin: `${apiHost}/${blogPath}/login`,
  blogRefresh: `${apiHost}/${blogPath}/refresh`,
  blogLogout: `${apiHost}/${blogPath}/logout`,
}

