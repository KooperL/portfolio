import React, { useContext, useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import { PageInformation, SchemeContext } from "../context/colourScheme"
import "./style.css"
import { Button } from "../../components/Button"
import { IslandCenter } from "../../templates/IslandCenter"
import { Input } from "../../components/Input"
import { Textarea } from "../../components/Textarea"
import { Radio } from "../../components/Radio"
import ErrorPage from "../ErrorPage"
import { useRandomBioState } from "../../controllers/useRandombioState"
import { State } from "../../types/State"
import { RandombioRequest } from "./types"
import { CMSPageResponse } from "../../components/TypeLookup/types"
import TypeLookup from "../../components/TypeLookup"

interface Props {
  scheme: PageInformation
  length: number
  setLength: React.Dispatch<React.SetStateAction<number>>
  type: number
  setType: React.Dispatch<React.SetStateAction<number>>
  single: boolean
  setSingle: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  statePOST: State<string>
  stateCMS: State<CMSPageResponse>
}

function RandomBioPage(props: Props): JSX.Element {
  function SearchBar(showingDesc: Boolean) {
    return (
      <div className="search-container">
        <div
          className="description"
          style={{ color: props.scheme.body.text }}
        >
          {showingDesc ? <TypeLookup {...props.stateCMS} /> : <></>}
        </div>
        <div className="form">
          <form onSubmit={props.onSubmit}>
            <div className="type">
              <Radio
                label="DNA"
                id="inputtype"
                name="inputtype"
                value="1"
                defaultChecked={props.type === 1}
                onClick={e => {
                  props.setType(+(e.target as HTMLTextAreaElement).value)
                }}
              />
              <Radio
                label="RNA"
                id="inputtype"
                name="inputtype"
                value="2"
                defaultChecked={props.type === 2}
                onClick={e => {
                  props.setType(+(e.target as HTMLTextAreaElement).value)
                }}
              />
              <Radio
                label="Amino acids"
                id="inputtype"
                name="inputtype"
                value="3"
                defaultChecked={props.type === 3}
                onClick={e => {
                  props.setType(+(e.target as HTMLTextAreaElement).value)
                }}
              />
            </div>
            <Input
              label="Sequence length:"
              name="length"
              id="length"
              value={props.length.toString()}
              onChange={e => {
                props.setLength(+e.target.value)
              }}
            />
            <div className="single">
              <p>Single letter abbreviations: </p>
              <input
                type="checkbox"
                id="inputtype"
                name="inputtype"
                value="t"
                disabled={props.type !== 3}
                defaultChecked={props.single === true}
                onChange={e => {
                  props.setSingle(!props.single)
                }}
              />
            </div>
            <div className="button">
              <Button colours={props.scheme} />
            </div>
          </form>
        </div>
      </div>
    )
  }
  if (props.statePOST.loading) return <Spinner />
  if (props.statePOST.error && props.statePOST.errorMessage)
    return <ErrorPage error={props.statePOST.errorMessage} />
  if (props.stateCMS.error && props.stateCMS.errorMessage) {
    return <ErrorPage error={props.stateCMS.errorMessage} />
  }
  if (props.statePOST.details && props.statePOST.details) {
    const data = props.statePOST.details
    return (
      <IslandCenter>
        <div className="randomBioPage">
          <div className="searchArea">
            {SearchBar(window.outerWidth > 1000)}
          </div>
          <hr />
          <div className="resultsCenter">
            <Textarea
              label="Results:"
              value={data}
              highlightOnFocus={true}
              readOnly={true}
            />
          </div>
        </div>
      </IslandCenter>
    )
  } else {
    return (
      <IslandCenter>
        <div className="randomBioPage">
          <>{SearchBar(true)}</>
        </div>
      </IslandCenter>
    )
  }
}

const Enhance = (): JSX.Element => {
  return <RandomBioPage {...useRandomBioState()} />
}

export default Enhance
