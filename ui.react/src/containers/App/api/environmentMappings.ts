// import { env } from "process";
import { environments, Environment } from "../../../config/environments"

const environmentalKeys = {
  production: "Prod",
  sit: "SIT",
  local: "Local",
}

const storageKey: string = "environment"

const configurationByEnv = (): Environment => {
  let environment = localStorage.getItem(storageKey)
  let configuration
  if (environment === environmentalKeys["production"]) {
    configuration = environments.PROD
  } else if (environment === environmentalKeys["local"]) {
    configuration = environments.LOCAL
  } else if (environment === environmentalKeys["sit"]) {
    configuration = environments.SIT
  } else {
    configuration = environments.LOCAL
  }
  // @ts-ignore
  return configuration
}

export const environmentConfig = (): Environment => {
  if (process.env.REACT_APP_NODE_ENV === "development") {
    localStorage.setItem(storageKey, environmentalKeys["local"])
  } else if (process.env.REACT_APP_NODE_ENV === "production") {
    localStorage.setItem(storageKey, environmentalKeys["production"])
  } else if (process.env.REACT_APP_NODE_ENV === "sit") {
    localStorage.setItem(storageKey, environmentalKeys["sit"])
  }

  let environment = localStorage.getItem(storageKey)
  if (!environment) {
    localStorage.setItem(storageKey, environmentalKeys["production"])
  }
  return configurationByEnv()
}
