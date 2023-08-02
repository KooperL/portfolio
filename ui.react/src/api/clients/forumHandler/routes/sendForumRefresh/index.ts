import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { fetchForum } from "../../instance";
import { forumPath, routes } from "../../types";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ForumRefreshRequestPayload, ForumRefreshResponsePayload } from "./types";
import { genericApiTokenResponse } from "src/api/shared/types";

function sendForumRefresh(data: ForumRefreshRequestPayload): Promise<AxiosResponse<ForumRefreshResponsePayload>> {
  const path = `${forumPath}/${routes.forumRefresh}`
  const config: AxiosRequestConfig = {
    url: path,
    data: data,
    withCredentials: true,
    method: 'POST'
  }
  const cacheKey: CacheKey = {
    CacheMode: CacheMode.NetworkFirst,
    CacheKey: routes.forumRefresh
  }
  return fetchForum.request(
    config,
    cacheKey,
  )
}

export {
  sendForumRefresh
}
