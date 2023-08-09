import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ForumPostViewRequestPayload, ForumPostViewResponsePayload } from "./types";
import { forumPath, routes } from "../../types";
import { fetchForum } from "../../instance";
import { genericApiDataResponse, genericApiRequestArgs, genericApiTokenResponse } from "src/api/shared/types";

function fetchForumPostView(props: genericApiRequestArgs<ForumPostViewRequestPayload>): Promise<AxiosResponse<genericApiDataResponse<ForumPostViewResponsePayload>>> {
  const {payload: data, auth: creds, varRoute: id} = props
  const path = `${routes.forumPost}/${id}`
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
