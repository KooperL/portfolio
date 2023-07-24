import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { fetchForum } from "../instance";
import { forumPath, routes } from "../types";
import { AxiosRequestConfig } from "axios";
import { ForumUserResponsePayload } from "./../../../../containers/forumUserPage/types";

function sendForumLogout(data: {}, creds: string): Promise<null> {
  const path = `${forumPath}/${routes.forumLogout}`
  const config: AxiosRequestConfig = {
    url: path,
    data: data,
    headers: { Authorization: `Bearer ${creds}` },
    withCredentials: true,
    method: 'POST'
  }
  const cacheKey: CacheKey = {
    CacheMode: CacheMode.NetworkFirst,
    CacheKey: routes.forumLogout
  }
  return fetchForum.request(
    config,
    cacheKey,
  )
}

export {
  sendForumLogout 
}

