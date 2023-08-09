import { AxiosResponse } from "axios";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { genericApiDataResponse, genericApiRequestArgs } from "src/api/shared/types";
import { fetchForum } from "../../instance";
import { forumPath, routes } from "../../types";
import { ForumHomeRequestPayload, ForumHomeResponsePayload } from "./types";

export function fetchForumHome(props: genericApiRequestArgs<ForumHomeRequestPayload>): Promise<AxiosResponse<genericApiDataResponse<ForumHomeResponsePayload>>> {
  const {payload: body} = props
  const path = ``
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
