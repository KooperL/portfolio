import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { fetchCMS } from "../instance";
import { cmsPath, routes } from "../types";

function fetchCmsGeneric(route: keyof typeof routes) {
  const path = `${cmsPath}/${route}`
  const config = {
    url: path 
  }
  const cacheKey: CacheKey = {
    CacheMode: CacheMode.CacheFirst,
    CacheKey: route
  }
  return fetchCMS.request(
    config,
    cacheKey,
  )
}

export {
  fetchCmsGeneric
}
