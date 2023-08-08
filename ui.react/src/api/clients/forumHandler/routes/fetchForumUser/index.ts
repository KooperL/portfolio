import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ForumUserRequestPayload, ForumUserResponsePayload } from "./types";
import { forumPath, routes } from "../../types";
import { fetchForum } from "../../instance";
import { genericApiDataResponse, genericApiRequestArgs } from "src/api/shared/types";

function fetchForumUser(props: genericApiRequestArgs<ForumUserRequestPayload>): Promise<AxiosResponse<genericApiDataResponse<ForumUserResponsePayload[]>>> {
  const {payload: data, auth: creds, varRoute: username} = props
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

