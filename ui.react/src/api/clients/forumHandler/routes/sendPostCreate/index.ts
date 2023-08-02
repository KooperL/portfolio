import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { forumPath, routes } from "../../types";
import { fetchForum } from "../../instance";
import { ForumPostCreateRequestPayload, ForumPostCreateResponsePayload } from "./types";
import { genericApiDataResponse } from "src/api/shared/types";
// TODO rename 

function sendForumPostCreate(data: ForumPostCreateRequestPayload, creds?: string): Promise<AxiosResponse<genericApiDataResponse<ForumPostCreateResponsePayload>>> {
  const path = `${forumPath}/${routes.forumPostCreate}`
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
