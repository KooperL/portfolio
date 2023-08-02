import React, { useContext, useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import { PageInformation, SchemeContext } from "../context/colourScheme"
import "./style.css"
import { Button } from "../../components/Button"
import { IslandCenter } from "../../templates/IslandCenter"
import { Input } from "../../components/Input"
import ErrorPage from "../ErrorPage"
import { useMrnaState } from "../../controllers/useMrnaState"
import { State } from "../../types/State"
import { MrnaRequest, MrnaResponse } from "./types"
import { CMSPageResponse } from "../../components/TypeLookup/types"
import TypeLookup from "../../components/TypeLookup"

interface Props {
  scheme: PageInformation
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  statePOST: State<MrnaResponse>
  stateCMS: State<CMSPageResponse>
}

function MrnaPage(props: Props): JSX.Element {
  function SearchBar(showingDesc: Boolean) {
    return (
      <div className="search-container">
        <div
          className="description"
          style={{ color: props.scheme.body.text }}
        >
          {showingDesc ? <TypeLookup {...props.stateCMS} /> : <></>}
        </div>
        <form onSubmit={props.onSubmit}>
          <div className="inputWithButton">
            <Input
              inputBoxLabel="🧬 DNA:"
              placeholder=" GATTACA..."
              value={props.value}
              onChange={e => {
                props.setValue(e.target.value)
              }}
            />
            <div className="button">
              <Button colours={props.scheme} />
            </div>
          </div>
        </form>
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
      <div className="mrnaPage">
        <IslandCenter>
          <div className="resultsScreen">
            <div className="searchArea">
              {SearchBar(window.outerWidth > 1000)}
            </div>
            <hr />
            <div className="resultsCenter">
              <div className="resultsContainer">
                <div>
                  <h2>Results: </h2>
                </div>
                <div className="analysisContainer">
                  <div className="result">
                    <p className="font-bold">Amino acids: </p>
                    <textarea
                      className=""
                      name="aa"
                      value={data.aa}
                      readOnly={true}
                    />
                  </div>
                  <div className="result">
                    <p className="font-bold">Amino acids (single): </p>
                    <textarea
                      className=""
                      name="aa"
                      value={data.aa_s}
                      readOnly={true}
                    />
                  </div>
                  <div className="result">
                    <p className="font-bold">mRNA: </p>
                    <textarea
                      className=""
                      name="aa"
                      value={data.mrna_field}
                      readOnly={true}
                    />
                  </div>
                  <div className="result">
                    <p className="font-bold">DNA: </p>
                    <textarea
                      className=""
                      name="aa"
                      value={data.dna_field}
                      readOnly={true}
                    />
                  </div>
                  <div className="result">
                    <p className="font-bold">Complimentary DNA: </p>
                    <textarea
                      className=""
                      name="aa"
                      value={data.rdna_field}
                      readOnly={true}
                    />
                  </div>
                  <div className="result paddingCell"></div>
                </div>
                <div className="analysisContainer statsContainer">
                  <div className="result">
                    <p className="font-bold">Stats: </p>
                    <p>Melting temperature (Tm in °C)</p>
                    <textarea
                      className=""
                      name="aa"
                      value={data.tm}
                      readOnly={true}
                    />
                    <p>GC content:</p>
                    <textarea
                      className=""
                      name="aa"
                      value={data.gccontent}
                      readOnly={true}
                    />
                    <p>Molecular weight:</p>
                    <textarea
                      className=""
                      name="aa"
                      value={data.molweight}
                      readOnly={true}
                    />
                    <p>Base frequency:</p>
                    {Object.keys(data.simplecount).map((link, indexLink) => (
                      <p key={indexLink}>
                        {/* @ts-ignore, dumbest fucking error, come on ts */}
                        {link}: {data.simplecount[link]}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </IslandCenter>
      </div>
    )
  } else {
    return (
      <div className="mrnaPage">
        <IslandCenter>
          <>{SearchBar(true)}</>
        </IslandCenter>
      </div>
    )
  }
}

const Enhance = (): JSX.Element => {
  return <MrnaPage {...useMrnaState()} />
}

export default Enhance
