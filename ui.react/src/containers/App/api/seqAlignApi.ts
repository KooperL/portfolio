import { SeqAlignRequest, SeqAlignResponse } from "@containers/seqAlignPage/types"
import { ApiError } from "../../../api/apiErrorHandler"
import { get } from "../../../api/restApi"
import { endpoints } from "./endpoints"
import { GenericResponse } from "./types"

export const fetchSeqAlign = (
  body: SeqAlignRequest,
): Promise<GenericResponse<SeqAlignResponse, ApiError>> => {
  const apiConfig = {
    headers: {},
    params: { ...body },
  }
  return get(endpoints["seqalign"], apiConfig)
}
