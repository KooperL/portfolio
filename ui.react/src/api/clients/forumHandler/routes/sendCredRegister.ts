import { ForumRegisterRequstPayload, ForumRegisterResponsepayload } from "../../../../containers/forumLoginPage/types";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { fetchForum } from "../instance";
import { forumPath, routes } from "../types";

function sendForumRegister(data: ForumRegisterRequstPayload, creds: string): Promise<ForumRegisterResponsepayload> {
  const path = `${forumPath}/${routes.forumRegister}`
  const config = {
    url: path,
    data: data,
    headers: { Authorization: `Basic ${creds}` },
    withCredentials: true,
    method: 'POST'
  }
  const cacheKey: CacheKey = {
    CacheMode: CacheMode.NetworkFirst,
    CacheKey: routes.forumRegister
  }
  return fetchForum.request(
    config,
    cacheKey,
  )
}

export {
  sendForumRegister
}
