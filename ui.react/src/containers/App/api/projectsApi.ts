import { ApiError } from "../../../api/apiErrorHandler"
import { get } from "../../../api/restApi"
import { HomePayload } from "../../homePage/types"
import { ProjectsPayload } from "../../projectsPage/types"
import { endpoints } from "./endpoints"
import { Payload } from "./types"

export const fetchProjects = (): Promise<ApiError | HomePayload> => {
  const apiConfig = {
    headers: {},
    params: {},
  }
  return get(endpoints["projects"], apiConfig)
}
