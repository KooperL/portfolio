import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { AxiosRequestConfig } from "axios";
import { ForumPostViewRequestPayload, ForumPostViewResponsePayload } from "./types";
import { forumPath, routes } from "../../types";
import { fetchForum } from "../../instance";
import { genericApiDataResponse, genericApiTokenResponse } from "src/api/shared/types";

function fetchForumPostView(data: ForumPostViewRequestPayload, creds?: string, id?: string): Promise<genericApiDataResponse<ForumPostViewResponsePayload>> {
  const path = `${forumPath}/${routes.forumPost}/${id}`
  const config: AxiosRequestConfig = {
    url: path,
    data: data,
    headers: { Authorization: `Bearer ${creds}` },
    withCredentials: true,
    method: 'POST'
  }
  const cacheKey: CacheKey = {
    CacheMode: CacheMode.NetworkFirst,
    CacheKey: routes.forumPost
  }
  return fetchForum.request(
    config,
    cacheKey,
  )
}

export {
  fetchForumPostView
}
