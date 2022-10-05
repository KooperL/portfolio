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
}

export interface Payload {
  data: any,
  success: boolean
}