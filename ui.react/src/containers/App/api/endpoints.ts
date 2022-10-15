import { ApiEndpoints, blogPath } from './types';
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
  projects: `${apiHost}/projects`,
  property: `${apiHost}/property`,
  mrna: `${apiHost}/mrna`,
  seqalign: `${apiHost}/seqalign`,
  render: `${apiHost}/render`,
  secondary: `${apiHost}/secondary`,
  fuelprices: `${apiHost}/fuelprices`,
  tictactoe: `${apiHost}/tictactoe`,
  randombio: `${apiHost}/randombio`,
  
  blogRegister: `${apiHost}/${blogPath}/register`,
  blogHome: `${apiHost}/${blogPath}`,
  blogPostCreate: `${apiHost}/${blogPath}/post`,
  blogPost: `${apiHost}/${blogPath}/post/`,
  blogLogin: `${apiHost}/${blogPath}/login`,
  blogRefresh: `${apiHost}/${blogPath}/refresh`,
}

