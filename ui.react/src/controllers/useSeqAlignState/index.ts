import { useState, useCallback, useContext, useEffect } from "react"
import { SchemeContext } from "../../containers/context/colourScheme"
import {
  SeqAlignRequest,
  SeqAlignResponse,
} from "../../containers/seqAlignPage/types"
import { useFetch } from "src/hooks/useFetch"
import { useCms } from "src/hooks/useCms"
import { sendSeqAlign } from "src/api/clients/ApiHandler/routes/sendSeqAlign"
import { useError } from "src/hooks/useError"

export const useSeqAlignState = () => {
  const [sampletxt, setSampletxt] = useState("")
  const [referencetxt, setReferencetxt] = useState("")
  const [identical, setIdentical] = useState(1.0)
  const [mismatch, setMismatch] = useState(0.0)
  const [gaps, setGaps] = useState(-0.5)
  const [extgaps, setExtgaps] = useState(-0.1)
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state: stateCMS, pull } = useCms()
  const { state: stateSubmit, pull: handleSubmit } = useFetch<SeqAlignRequest, SeqAlignResponse>()
  const { raiseError } = useError();
  
  useEffect(() => {
    if (stateCMS.error) {
      raiseError({
        errorType: 'NETWORK',
        errorMessage: 'Error fetching data'
      })
    }
  }, [stateCMS])


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit({
      ApiImpl: sendSeqAlign,
      payload: {
      sampletxt: sampletxt,
      referencetxt: referencetxt,
      identical: identical,
      mismatch: mismatch,
      gaps: gaps,
      extgaps: extgaps,
    }
    })
  }

  useEffect(() => {
    document.title = `Protein Secondary Structure | ${scheme.title}`
    pull("seqalignCms")
  }, [])

  return {
    sampletxt,
    setSampletxt,
    referencetxt,
    setReferencetxt,
    identical,
    setIdentical,
    mismatch,
    setMismatch,
    gaps,
    setGaps,
    extgaps,
    setExtgaps,
    scheme,
    onSubmit,
    stateSubmit,
    stateCMS,
  }
}
