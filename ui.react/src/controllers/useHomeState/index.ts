import { fetchCMSData } from "@containers/App/api/genericCMSApi"
import { cmsData, CmsEndpoints, GenericResponse } from "@containers/App/api/types"
import { useContext, useEffect, useState } from "react"
import { ApiError } from "src/api/apiErrorHandler"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useFetch } from "../../hooks/useFetch"

export const useHomeState = () => {
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state: stateCMS, pull } = useFetch<keyof CmsEndpoints, cmsData[]>(fetchCMSData)

  useEffect(() => {
    document.title = `Home | ${scheme.title}`
    pull('homeCms')
  }, [])

  return {
    stateCMS,
    scheme,
  }
}
