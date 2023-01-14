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
  forumHome: string;
  // forumSearch: string;
  forumPostCreate: string;
  forumLogin: string;
  forumPost: string;
  forumUser: string;
  forumRegister: string;
  forumRefresh: string;
  forumLogout: string;
}

export interface emptyPayload {
  success: boolean;
}

export interface Payload extends emptyPayload {
  data: any;
}

export const forumPath = 'forum'
export const projectPath = 'projects'