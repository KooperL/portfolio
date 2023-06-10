import React, { useContext, useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import { fetchSeqAlign } from "../App/api/seqAlignApi"
import Modal from "../../components/Modal"
// @ts-ignore
import gear from "../../assets/gear.svg"
import { PageInformation, SchemeContext } from "../context/colourScheme"
import { Button } from "../../components/Button"
import "./style.css"
import { IslandCenter } from "../../templates/IslandCenter"
import { Input } from "../../components/Input"
import { Gear } from "../../components/Gear"
import { Radio } from "../../components/Radio"
import { ApiError } from "../../api/apiErrorHandler"
import ErrorPage from "../ErrorPage"
import { useSeqAlignState } from "../../controllers/useSeqAlignState"
import { useSubmit } from "../../hooks/useSubmit"
import { State } from "../../types/State"
import { SeqAlignResponse } from "./types"
import { CMSPage } from "../../components/TypeLookup/types"

interface Props {
  sampletxt: string
  setSampletxt: React.Dispatch<React.SetStateAction<string>>
  referencetxt: string
  setReferencetxt: React.Dispatch<React.SetStateAction<string>>
  identical: number
  setIdentical: React.Dispatch<React.SetStateAction<number>>
  mismatch: number
  setMismatch: React.Dispatch<React.SetStateAction<number>>
  gaps: number
  setGaps: React.Dispatch<React.SetStateAction<number>>
  extgaps: number
  setExtgaps: React.Dispatch<React.SetStateAction<number>>
  scheme: PageInformation
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  stateSubmit: State<SeqAlignResponse>
  stateCMS: State<CMSPage>
}

function SeqAlignPage(props: Props): JSX.Element {
  function SearchBar(showingDesc: Boolean) {
    return (
      <div className="search-container">
        <div
          className="description"
          style={{ color: props.scheme.body.text }}
        >
          {showingDesc ? (
            <p>
              Enter two sequences of DNA to see how well they physically align.
            </p>
          ) : (
            <></>
          )}
        </div>
        <form onSubmit={props.onSubmit}>
          <div className="searchBoxes">
            <Input
              inputBoxLabel="DNA strand 1:"
              name="referencetxt"
              id="referencetxt"
              value={props.referencetxt}
              onChange={e => {
                props.setReferencetxt(e.target.value)
              }}
            />
            <Input
              inputBoxLabel="DNA strand 2:"
              name="sampletxt"
              id="sampletxt"
              value={props.sampletxt}
              onChange={e => {
                props.setSampletxt(e.target.value)
              }}
            />
          </div>
          <div className="buttonWithGear">
            <Button
              colours={props.scheme}
              disabled={
                props.referencetxt.length < 4 && props.sampletxt.length < 4
                  ? true
                  : false
              }
            />
            <Modal closedChildren={<Gear />}>
              <div>
                <Input
                  label="Identical base reward:"
                  name="identical"
                  id="identical"
                  value={props.identical.toString()}
                  onChange={e => {
                    props.setIdentical(+e.target.value)
                  }}
                />
                <Input
                  label="Mismatching base penalty:"
                  name="mismatch"
                  id="mismatch"
                  value={props.mismatch.toString()}
                  onChange={e => {
                    props.setMismatch(+e.target.value)
                  }}
                />
                <Input
                  label="Beginning gap penalty:"
                  name="gaps"
                  id="gaps"
                  value={props.gaps.toString()}
                  onChange={e => {
                    props.setGaps(+e.target.value)
                  }}
                />
                <Input
                  label="Extending gap penalty:"
                  name="extgaps"
                  id="extgaps"
                  value={props.extgaps.toString()}
                  onChange={e => {
                    props.setExtgaps(+e.target.value)
                  }}
                />
              </div>
            </Modal>
          </div>
        </form>
      </div>
    )
  }

  if (props.stateSubmit.loading) return <Spinner />
  if (props.stateSubmit.error && props.stateSubmit.errorMessage)
    return <ErrorPage error={props.stateSubmit.errorMessage} />
  if (props.stateSubmit.details && props.stateSubmit.details) {
    const data = props.stateSubmit.details
    const splitDrawArray = data.draw_res.map(elem => elem.split("\n"))

    return (
      <IslandCenter>
        <div className="seqAlignPage">
          <div>
            <div className="resultsScreen">
              {SearchBar(window.outerWidth > 1000)}
            </div>
            <hr />
            <div className="resultTitle">Results:</div>
            <div className="resultsContainer">
              <div className="results">
                {splitDrawArray.map((res, ind) => (
                  <div
                    key={ind}
                    className="result"
                  >
                    <div>
                      <p
                        key={ind}
                        className="resultTitle"
                      >
                        Possible result:{" "}
                      </p>
                      {/** @ts-ignore */}
                      {/* {state.details.draw_res[ind].split('\n').map((line, lineInd) => ( */}
                      {/* <p key={lineInd} className="resultBody">{line}</p> */}
                      {/* ))} */}
                      {/** @ts-ignore */}
                      <textarea
                        rows={5}
                        className="resultBody"
                      >{`${res[0]}\n${res[1]}\n${res[2]}\n${res[3]}\n`}</textarea>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </IslandCenter>
    )
  } else {
    return (
      <IslandCenter>
        <div className="seqAlignPage">
          <div className="innerContainer">{SearchBar(true)}</div>
        </div>
      </IslandCenter>
    )
  }
}

const Enhance = (): JSX.Element => {
  return <SeqAlignPage {...useSeqAlignState()} />
}

export default Enhance
