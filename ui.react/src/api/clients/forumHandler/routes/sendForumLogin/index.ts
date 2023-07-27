import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { AxiosRequestConfig } from "axios";
import { ForumLoginRequestPayload, ForumLoginResponsePayload } from "./types";
import { forumPath, routes } from "../../types";
import { fetchForum } from "../../instance";
import { genericApiDataResponse } from "src/api/shared/types";

function sendForumLogin(data: ForumLoginRequestPayload, creds?: string): Promise<genericApiDataResponse<ForumLoginResponsePayload>> {
  const path = `${forumPath}/${routes.forumLogin}`
  const config: AxiosRequestConfig = {
    url: path,
    data: data,
    headers: { Authorization: `Basic ${creds}` },
    withCredentials: true,
    method: 'POST'
  }
  const cacheKey: CacheKey = {
    CacheMode: CacheMode.NetworkFirst,
    CacheKey: routes.forumLogin
  }
  return fetchForum.request(
    config,
    cacheKey,
  )
}

export {
  sendForumLogin 
}
