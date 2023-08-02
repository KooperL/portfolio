import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ForumUserRequestPayload, ForumUserResponsePayload } from "./types";
import { forumPath, routes } from "../../types";
import { fetchForum } from "../../instance";
import { genericApiDataResponse } from "src/api/shared/types";

function fetchForumUser(data: ForumUserRequestPayload, creds?: string, username?: string): Promise<AxiosResponse<genericApiDataResponse<ForumUserResponsePayload[]>>> {
  const path = `${forumPath}/${routes.forumUser}/${username}`
  const config: AxiosRequestConfig = {
    url: path,
    data: data,
    headers: { Authorization: `Bearer ${creds}` },
    withCredentials: true,
    method: 'POST'
  }
  const cacheKey: CacheKey = {
    CacheMode: CacheMode.NetworkFirst,
    CacheKey: routes.forumUser
  }
  return fetchForum.request(
    config,
    cacheKey,
  )
}

export {
  fetchForumUser 
}

