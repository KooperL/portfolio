import { CMSPageResponse } from "src/components/TypeLookup/types";
import { AxiosResponse } from "axios";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { fetchCMS } from "../instance";
import { cmsPath, routes } from "../types";

function fetchCmsGeneric(route: keyof typeof routes): Promise<AxiosResponse<CMSPageResponse>> {
  const path = `${cmsPath}/${route}`
  const config = {
    url: path 
  }
  const cacheKey: CacheKey = {
    CacheMode: CacheMode.CacheFirst,
    CacheKey: route.toString()
  }
  return fetchCMS.request(
    config,
    cacheKey,
  )
}

export {
  fetchCmsGeneric
}
