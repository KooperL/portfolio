import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { genericApiDataResponse } from "src/api/shared/types";
import { fetchForum } from "../../instance";
import { forumPath, routes } from "../../types";
import { ForumHomeRequestPayload, ForumHomeResponsePayload } from "./types";

export function fetchForumHome(data: ForumHomeRequestPayload): Promise<genericApiDataResponse<ForumHomeResponsePayload>> {
  const path = `${forumPath}`
  const config = {
    url: path 
  }
  const cacheKey: CacheKey = {
    CacheMode: CacheMode.NetworkFirst,
    CacheKey: forumPath
  }
  return fetchForum.request(
    config,
    cacheKey,
  )
}

export {
}
