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
    apiHost: 'https://SIT.kooperlingohr.com/api'
  },
  LOCAL: {
    apiHost: `http://localhost:${process.env.REACT_APP_DEV_FLASK_API_PORT}`
  }
}
