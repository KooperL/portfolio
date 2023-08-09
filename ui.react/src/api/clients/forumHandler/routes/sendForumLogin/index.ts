import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ForumLoginRequestPayload, ForumLoginResponsePayload } from "./types";
import { forumPath, routes } from "../../types";
import { fetchForum } from "../../instance";
import { genericApiDataResponse, genericApiRequestArgs } from "src/api/shared/types";

function sendForumLogin(props: genericApiRequestArgs<ForumLoginRequestPayload>): Promise<AxiosResponse<genericApiDataResponse<ForumLoginResponsePayload>>> {
  const {payload: data, auth: creds} = props
  const path = `${routes.forumLogin}`
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
