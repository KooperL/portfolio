// @ts-nocheck
import { fetchSiteAnalysis } from "../../containers/App/api/siteAnalysisApi"
import { SchemeContext } from "../../containers/context/colourScheme"
import { siteAnalysisResp } from "../../containers/siteAnalysisPage/types"
import { useContext, useEffect, useRef, useState } from "react"
import { useFetch } from "src/hooks/useFetch"

import React from "react"

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
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<any>(null)

  useEffect(() => {
    document.title = `Site analysis | ${scheme.title}`
    pull()
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
    // ref
  }
}
