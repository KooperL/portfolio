import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { fetchForum } from "../instance";
import { forumPath, routes } from "../types";
import { AxiosRequestConfig } from "axios";
import { ForumPostCreateRequestPayload, ForumPostCreateResponsePayload } from "./../../../../containers/forumPostCreatePage/types";

function sendForumPostCreate(data: ForumPostCreateRequestPayload, creds: string): Promise<ForumPostCreateResponsePayload> {
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
