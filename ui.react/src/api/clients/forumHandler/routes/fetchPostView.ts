import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { fetchForum } from "../instance";
import { forumPath, routes } from "../types";
import { AxiosRequestConfig } from "axios";
import { ForumPostCreateRequestPayload, ForumPostCreateResponsePayload } from "./../../../../containers/forumPostCreatePage/types";

function sendForumPostCreate(data: ForumPostCreateRequestPayload, creds: string): Promise<ForumPostCreateResponsePayload> {
  const path = `${forumPath}/${routes.forumPostCreate}`
  const config: AxiosRequestConfig = {
    url: path,
    data: data,
    headers: { Authorization: `Bearer ${creds}` },
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
  sendForumRefresh
}

export const getPostView = (
  data: ForumPostViewGETPayload,
  authJWT: string,
  id: number,
): Promise<GenericResponse<ForumLoginPOSTPayload, ApiError>> => {
  console.log(data)
  const apiConfig = {
    headers: {
      Authorization: `Bearer ${authJWT}`,
      "content-type": "application/json",
      "content-length": JSON.stringify(data).length,
    },
    data: data,
  }
  return post(`${endpoints["forumPost"]}${id}`, apiConfig)
}
