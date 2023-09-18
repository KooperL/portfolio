import {
  ForumRegisterRequstPayload,
  ForumRegisterResponsepayload,
} from "./types"
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types"
import { fetchForum } from "../../instance"
import { forumPath, routes } from "../../types"
import {
  genericApiDataResponse,
  genericApiRequestArgs,
} from "src/api/shared/types"
import { AxiosResponse } from "axios"

function sendForumRegister(
  props: genericApiRequestArgs<ForumRegisterRequstPayload>,
): Promise<
  AxiosResponse<genericApiDataResponse<ForumRegisterResponsepayload>>
> {
  const { payload: data, auth: creds } = props
  const path = `${routes.forumRegister}`
  const config = {
    url: path,
    data: data,
    headers: { Authorization: `Basic ${creds}` },
    withCredentials: true,
    method: "POST",
  }
  const cacheKey: CacheKey = {
    CacheMode: fetchForum.defaultCacheMode,
    CacheKey: null,
  }
  return fetchForum.request(config, cacheKey)
}

export { sendForumRegister }
