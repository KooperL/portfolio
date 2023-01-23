import { useState, useCallback, useContext, useEffect } from "react"
import {
  SeqAlignPayload,
  SeqAlignState,
  SeqAlignInitialState,
  SeqAlignPOST,
} from "../../containers/seqAlignPage/types"
import { fetchSeqAlign } from "../../containers/App/api/seqAlignApi"
import { useSubmit } from "../../hooks/useSubmit"
import { SchemeContext } from "../../containers/context/colourScheme"

export const useSeqAlignState = () => {
  const [sampletxt, setSampletxt] = useState("")
  const [referencetxt, setReferencetxt] = useState("")
  const [identical, setIdentical] = useState(1.0)
  const [mismatch, setMismatch] = useState(0.0)
  const [gaps, setGaps] = useState(-0.5)
  const [extgaps, setExtgaps] = useState(-0.1)
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state, handleSubmit } = useSubmit<SeqAlignPayload, SeqAlignPOST>(fetchSeqAlign)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, {
      sampletxt: sampletxt,
      referencetxt: referencetxt,
      identical: identical,
      mismatch: mismatch,
      gaps: gaps,
      extgaps: extgaps,
    })
  }

  useEffect(() => {
    document.title = `Protein Secondary Structure | ${scheme.title}`
  }, [])

  return { sampletxt, setSampletxt,
    referencetxt, setReferencetxt,
    identical, setIdentical,
    mismatch, setMismatch,
    gaps, setGaps,
    extgaps, setExtgaps,
    scheme, onSubmit, state }
}
