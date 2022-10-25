export interface ApiEndpoints {
  home: string;
  about: string;
  contact: string;
  capture: string;
  monitor: string;
  track: string;
  logsInsert: string;
  logsPull: string;
  projects: string;
  property: string;
  mrna: string;
  seqalign: string;
  render: string;
  fuelprices: string;
  secondary: string;
  tictactoe: string;
  randombio: string;
  blogHome: string;
  // blogSearch: string;
  blogPostCreate: string;
  blogLogin: string;
  blogPost: string;
  blogUser: string;
  // blogUser: string;
  blogRegister: string;
  blogRefresh: string;
}

export interface emptyPayload {
  success: boolean;
}

export interface Payload extends emptyPayload {
  data: any;
}

export const blogPath = 'blog'
export const projectPath = 'projects'