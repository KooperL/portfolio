import path from "path"
import { ApiHandlerCore } from "src/api/ApiHandlerCore"
import { CacheMode } from "src/api/ApiHandlerCore/types"
import { environmentConfig } from "src/api/environmentMappings"
import { projectPath } from "src/api/shared/types"
import { v4 } from "uuid"

const apiHost = environmentConfig()

const ApiConsumer = new ApiHandlerCore(
  {
    baseURL: `${apiHost.apiHost.toString()}/`,
    headers: {
      "X-Request-ID": v4(),
    },
  },
  2,
  CacheMode.NetworkFirst,
)

export { ApiConsumer }
