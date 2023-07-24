import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { fetchForum } from "../instance";
import { forumPath, routes } from "../types";
import { AxiosRequestConfig } from "axios";
import { ForumRefreshRequestPayload, ForumRefreshResponsePayload } from "./../../../../containers/forumLoginPage/types";

function sendForumRefresh(data: ForumRefreshRequestPayload): Promise<ForumRefreshResponsePayload> {
  const path = `${forumPath}/${routes.forumRefresh}`
  const config: AxiosRequestConfig = {
    url: path,
    data: data,
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
  sendForumRefresh
}
