export interface Environment {
  [env: string]: {
    apiHost: string;  
  }
}

export const environments: Environment = {
  PROD: {
    apiHost: 'https://kooperlingohr.com/api'
  },
  SIT: {
    apiHost: 'https://SIT.kooperlingohr.com'
  },
  LOCAL: {
    apiHost: 'http://localhost:5000'
  }
}
