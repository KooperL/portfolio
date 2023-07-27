import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { fetchForum } from "../../instance";
import { forumPath, routes } from "../../types";
import { ForumHomeRequestPayload, ForumHomeResponsePayload } from "./types";

export function fetchForumHome(data: ForumHomeRequestPayload): Promise<ForumHomeResponsePayload> {
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
