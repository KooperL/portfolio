export interface Environment {
  [env: string]: {
    apiHost: string;  
  }
}

export const environments: Environment = {
  PROD: {
    apiHost: 'https://api.kooperlingohr.com'
  },
  SIT: {
    apiHost: 'https://SIT.kooperlingohr.com'
  },
  LOCAL: {
    apiHost: 'http://localhost:5000'
  }
}
