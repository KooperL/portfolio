import { ApiError } from "../../../api/apiErrorHandler"
import { get } from "../../../api/restApi"
import { ProjectsPayload } from "../../projectsPage/types"
import { endpoints } from "./endpoints"
import { Payload } from "./types"

export const fetchProjects = (): Promise<ApiError | ProjectsPayload> => {
  const apiConfig = {
    headers: {},
    params: {},
  }
  return get(endpoints["projects"], apiConfig)
}
