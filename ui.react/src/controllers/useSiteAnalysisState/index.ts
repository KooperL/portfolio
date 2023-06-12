import { fetchSiteAnalysis } from "../../containers/App/api/siteAnalysisApi"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useContext, useEffect, useRef, useState } from "react"
import { useFetch } from "src/hooks/useFetch"

import React from "react"
import { CmsEndpoints } from "../../containers/App/api/types"
import { CMSPage } from "../../components/TypeLookup/types"
import { fetchCMSData } from "../../containers/App/api/genericCMSApi"
import { siteAnalysisResponse } from "../../containers/siteAnalysisPage/types"

declare module "react" {
  interface SVGElement extends React.ReactElement<SVGElement> {}
  interface LineElement extends React.ReactElement<LineElement> {}
  interface TextElement extends React.ReactElement<TextElement> {}
  interface DefsElement extends React.ReactElement<DefsElement> {}
  interface MarkerElement extends React.ReactElement<MarkerElement> {}
  interface PathElement extends React.ReactElement<PathElement> {}
}

export const useSiteAnalysisState = () => {
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state, pull } = useFetch<null, siteAnalysisResponse>(
    fetchSiteAnalysis,
  )
  const { state: stateCMS, pull: pullCMS } = useFetch<
    keyof CmsEndpoints,
    CMSPage
  >(fetchCMSData)
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<any>(null)

  useEffect(() => {
    document.title = `Site analysis | ${scheme.title}`
    pull(null)
    pullCMS("siteanalysisCms")
    // ref.current && ref.current.getContext('2d').drawImage(document.getElementById("myCanvas"), 0, 0);
  }, [])

  useEffect(() => {
    const canvas = document.getElementById("myCanvas2")
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
