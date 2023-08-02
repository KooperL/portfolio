import { SeqAlignRequest, SeqAlignResponse } from "./../../../../containers/seqAlignPage/types";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { ApiConsumer } from "../instance";
import { routes } from "../types";
import { genericApiDataResponse } from "src/api/shared/types";
import { AxiosResponse } from "axios";


export const sendSeqAlign = (data: SeqAlignRequest): Promise<AxiosResponse<genericApiDataResponse<SeqAlignResponse>>> => {
  const path = `${routes.seqalign}`
  const config = {
    url: path,
    params: data,
  }
  const cacheKey: CacheKey = {
    CacheMode: CacheMode.NetworkFirst,
    CacheKey: path
  }
  return ApiConsumer.request(
    config,
    cacheKey,
  )
}

export {
}
