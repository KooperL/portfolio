import { ForumLoginRequestPayload, ForumRegisterResponsepayload } from "../../../../containers/forumLoginPage/types";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { fetchForum } from "../instance";
import { forumPath, routes } from "../types";
import { AxiosRequestConfig } from "axios";

function sendForumLogin(data: ForumLoginRequestPayload, creds: string): Promise<ForumRegisterResponsepayload> {
  const path = `${forumPath}/${routes.forumLogin}`
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
