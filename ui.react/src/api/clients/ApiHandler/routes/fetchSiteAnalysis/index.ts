import { siteAnalysisResponse } from './types'
import { CacheKey, CacheMode } from 'src/api/ApiHandlerCore/types'
import { ApiConsumer } from '../../instance'
import { routes } from '../../types'
import {
  genericApiDataResponse,
  genericApiRequestArgs,
  projectPath,
} from 'src/api/shared/types'
import { AxiosResponse } from 'axios'

export const fetchSiteAnalysis = (
  props: genericApiRequestArgs<any>,
): Promise<AxiosResponse<genericApiDataResponse<siteAnalysisResponse>>> => {
  const { payload: body } = props
  const path = `${projectPath}/${routes.logsPull}`
  const config = {
    url: path,
  }
  const cacheKey: CacheKey = {
    CacheMode: CacheMode.CacheFirst,
    CacheKey: path,
  }
  return ApiConsumer.request(config, cacheKey)
}

export {}
