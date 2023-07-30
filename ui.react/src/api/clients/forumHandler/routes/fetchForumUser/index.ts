import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { AxiosRequestConfig } from "axios";
import { ForumUserResponsePayload } from "./types";
import { forumPath, routes } from "../../types";
import { fetchForum } from "../../instance";

function fetchForumUser(data: ForumUserResponsePayload, creds?: string, username?: string): Promise<ForumUserResponsePayload[]> {
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

