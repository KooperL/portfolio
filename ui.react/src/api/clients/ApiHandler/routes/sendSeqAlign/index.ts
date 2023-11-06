import { SeqAlignRequest, SeqAlignResponse } from './types'
import { CacheKey, CacheMode } from 'src/api/ApiHandlerCore/types'
import { ApiConsumer } from '../../instance'
import { routes } from '../../types'
import {
  genericApiDataResponse,
  genericApiRequestArgs,
  projectPath,
} from 'src/api/shared/types'
import { AxiosResponse } from 'axios'

export const sendSeqAlign = (
  props: genericApiRequestArgs<SeqAlignRequest>,
): Promise<AxiosResponse<genericApiDataResponse<SeqAlignResponse>>> => {
  const { payload: params } = props
  const path = `${projectPath}/${routes.seqalign}`
  const config = {
    url: path,
    params,
  }
  const cacheKey: CacheKey = {
    CacheMode: CacheMode.NetworkFirst,
    CacheKey: path,
  }
  return ApiConsumer.request(config, cacheKey)
}

export {}
