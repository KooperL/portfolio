import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { fetchForum } from "../instance";
import { forumPath, routes } from "../types";
import { AxiosRequestConfig } from "axios";
import { ForumUserResponsePayload } from "./../../../../containers/forumUserPage/types";

function sendForumPostView(data: {}, creds: string, username: string): Promise<ForumUserResponsePayload[]> {
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
  sendForumPostView
}

