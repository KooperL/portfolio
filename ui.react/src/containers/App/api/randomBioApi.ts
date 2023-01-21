import { ApiError } from "../../../api/apiErrorHandler"
import { get } from "../../../api/restApi"
import { RandomBioPayload, RandomBioPOST } from "../../randomBioPage/types"
import { endpoints } from "./endpoints"

export const fetchRandomBio = (
  body: RandomBioPOST,
): Promise<ApiError | RandomBioPayload> => {
  const apiConfig = {
    headers: {},
    params: { ...body },
  }
  return get(endpoints["randombio"], apiConfig)
}
