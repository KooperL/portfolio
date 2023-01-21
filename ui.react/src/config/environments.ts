export interface Environment {
  [env: string]: {
    apiHost: string
  }
}
// TODO
export const environments: Environment = {
  PROD: {
    apiHost: "https://kooperlingohr.com/api/v1",
  },
  SIT: {
    apiHost: "https://SIT.kooperlingohr.com/api/v1",
  },
  LOCAL: {
    apiHost: `http://localhost:${process.env.REACT_APP_DEV_FLASK_API_PORT}`,
  },
}
