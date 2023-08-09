import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { forumPath, routes } from "../../types";
import { fetchForum } from "../../instance";
import { ForumPostCreateRequestPayload, ForumPostCreateResponsePayload } from "./types";
import { genericApiDataResponse, genericApiRequestArgs } from "src/api/shared/types";
// TODO rename 

function sendForumPostCreate(props: genericApiRequestArgs<ForumPostCreateRequestPayload>): Promise<AxiosResponse<genericApiDataResponse<ForumPostCreateResponsePayload>>> {
  const {payload: data, auth: creds} = props
  const path = `${routes.forumPostCreate}`
  const config: AxiosRequestConfig = {
    url: path,
    data: data,
    headers: { Authorization: `Bearer ${creds}` },
    withCredentials: true,
    method: 'POST'
  }
  const cacheKey: CacheKey = {
    CacheMode: CacheMode.NetworkFirst,
    CacheKey: routes.forumPostCreate
  }
  return fetchForum.request(
    config,
    cacheKey,
  )
}

export {
  sendForumPostCreate
}
