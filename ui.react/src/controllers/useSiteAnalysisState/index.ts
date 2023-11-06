import { SchemeContext } from '../../state/colorScheme/colourScheme'
import { useContext, useEffect, useRef, useState } from 'react'
import { useFetch } from 'src/hooks/useFetch'

import React from 'react'
import { useCms } from 'src/hooks/useCms'
import { fetchSiteAnalysis } from 'src/api/clients/ApiHandler/routes/fetchSiteAnalysis'
import { useError } from 'src/hooks/useError'
import { genericApiDataResponse } from 'src/api/shared/types'
import {
  siteAnalysisRequest,
  siteAnalysisResponse,
} from 'src/api/clients/ApiHandler/routes/fetchSiteAnalysis/types'

declare module 'react' {
  interface SVGElement extends React.ReactElement<SVGElement> {}
  interface LineElement extends React.ReactElement<LineElement> {}
  interface TextElement extends React.ReactElement<TextElement> {}
  interface DefsElement extends React.ReactElement<DefsElement> {}
  interface MarkerElement extends React.ReactElement<MarkerElement> {}
  interface PathElement extends React.ReactElement<PathElement> {}
}

export const useSiteAnalysisState = () => {
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state, pull } = useFetch<
    siteAnalysisRequest,
    genericApiDataResponse<siteAnalysisResponse>
  >()

  const { state: stateCMS, pull: pullCMS } = useCms()
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<any>(null)
  const { raiseError } = useError()

  useEffect(() => {
    if (stateCMS.error) {
      raiseError({
        errorType: 'NETWORK',
        errorMessage: 'Error fetching data',
      })
    }
  }, [stateCMS])

  useEffect(() => {
    document.title = `Site analysis | ${scheme.title}`
    pull({
      ApiImpl: fetchSiteAnalysis,
      payload: {},
    })
    pullCMS('siteanalysisCms')
    // ref.current && ref.current.getContext('2d').drawImage(document.getElementById("myCanvas"), 0, 0);
  }, [])

  useEffect(() => {
    const canvas = document.getElementById('myCanvas2')
    // @ts-ignore
    canvas && generateCanvas(canvas)
  }, [loaded])

  return {
    state,
    scheme,
    setLoaded,
    stateCMS,
    // ref
  }
}
