import { CMSPageResponse } from "src/components/TypeLookup/types"
import { AxiosRequestConfig } from "axios"
import { useCallback, useEffect, useState } from "react"
import { genericApiDataResponse } from "src/api/shared/types"
import { State } from "../../types/State"
import { fetchCmsGeneric } from "src/api/clients/CmsHandler/routes/generic"
import { routes } from "src/api/clients/CmsHandler/types"


export const useCms = (
) => {
  const [state, setState] = useState<State<CMSPageResponse>>({
    loading: true,
    details: null,
    errorMessage: null,
    error: false,
  })
  const pull = useCallback(
    (route: keyof typeof routes) => {
      fetchCmsGeneric(route)
        .then((resp) => {
          if (resp.data.hasOwnProperty("id")) {
            setState({
              details: resp?.data || null,
              error: false,
              errorMessage: null,
              loading: false,
            })
          } else {
            setState({
              details: null,
              error: true,
              errorMessage: resp?.status.toString() ?? null,
              loading: false,
            })
          }
        })
        .catch((err: any) => {
          setState({
            details: null,
            error: true,
            errorMessage: err,
            loading: false,
          })
        })
    },
    [state],
  )

  return { state, pull }
}
