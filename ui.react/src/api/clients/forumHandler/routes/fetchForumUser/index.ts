import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types"
import { AxiosRequestConfig, AxiosResponse } from "axios"
import { ForumUserRequestPayload, ForumUserResponsePayload } from "./types"
import { forumPath, routes } from "../../types"
import { fetchForum } from "../../instance"
import {
  genericApiDataResponse,
  genericApiRequestArgs,
} from "src/api/shared/types"

function fetchForumUser(
  props: genericApiRequestArgs<ForumUserRequestPayload>,
): Promise<AxiosResponse<genericApiDataResponse<ForumUserResponsePayload[]>>> {
  const { payload: data, auth: creds, varRoute: username } = props
  const path = `${routes.forumUser}/${username}`
  const config: AxiosRequestConfig = {
    url: path,
    params: data,
    headers: {
      Authorization: `Bearer ${creds}`,
    },
    withCredentials: true,
  }
  const cacheKey: CacheKey = {
    CacheMode: fetchForum.defaultCacheMode,
    CacheKey: null,
  }
  return fetchForum.request(config, cacheKey)
}

export { fetchForumUser }
