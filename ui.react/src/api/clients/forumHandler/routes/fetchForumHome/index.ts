import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { CacheKey, CacheMode } from 'src/api/ApiHandlerCore/types'
import {
  genericApiDataResponse,
  genericApiRequestArgs,
} from 'src/api/shared/types'
import { fetchForum } from '../../instance'
import { forumPath, routes } from '../../types'
import { ForumHomeRequestPayload, ForumHomeResponsePayload } from './types'

export function fetchForumHome(
  props: genericApiRequestArgs<ForumHomeRequestPayload>,
): Promise<AxiosResponse<genericApiDataResponse<ForumHomeResponsePayload>>> {
  const { payload: data, auth } = props
  const path = ``
  const config: AxiosRequestConfig = {
    url: path,
    headers: {
      Authorization: `Bearer ${auth}`,
    },
    params: data,
    withCredentials: true,
  }
  const cacheKey: CacheKey = {
    CacheMode: fetchForum.defaultCacheMode,
    CacheKey: null,
  }
  return fetchForum.request(config, cacheKey)
}

export {}
