import React, { useContext, useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import {
  RandomBioPayload,
  RandomBioState,
  RandomBioInitialState,
  RandomBioPOST,
} from "./types"
import { fetchRandomBio } from "../App/api/randomBioApi"
import { PageInformation, SchemeContext } from "../context/colourScheme"
import "./style.css"
import { Button } from "../../components/Button"
import { IslandCenter } from "../../templates/IslandCenter"
import { Input } from "../../components/Input"
import { Textarea } from "../../components/Textarea"
import { Radio } from "../../components/Radio"
import ErrorPage from "../ErrorPage"
import { useRandomBioState } from "../../controllers/useRandombioState"
import { State } from "../../types/state"

interface Props {
  scheme: PageInformation
  length: number
  setLength: React.Dispatch<React.SetStateAction<number>>
  type: number
  setType: React.Dispatch<React.SetStateAction<number>>
  single: boolean
  setSingle: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  state: State<RandomBioPayload>
}

function RandomBioPage(props: Props): JSX.Element {
  function SearchBar(showingDesc: Boolean) {
    return (
      <div className="search-container">
        <div
          className="description"
          style={{ color: props.scheme.body.text }}
        >
          {showingDesc ? (
            <p>
              Generate a random sequence of nucleotides or amino acid residues.
            </p>
          ) : (
            <></>
          )}
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
  if (props.state.loading) return <Spinner />
  if (props.state.error && props.state.errorMessage)
    return <ErrorPage error={props.state.errorMessage} />
  if (props.state.details && props.state.details.data) {
    const data = props.state.details.data
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
              value={data.join("")}
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
