import React, { useContext, useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import Modal from "../../components/Modal"
// @ts-ignore
import gear from "../../assets/gear.svg"
import "./style.css"
import { PageInformation, SchemeContext } from "../../state/colorScheme/colourScheme"
import { Button } from "../../components/Button"
import { IslandCenter } from "../../templates/IslandCenter"
import { Input } from "../../components/Input"
import { Radio } from "../../components/Radio"
import { Gear } from "../../components/Gear"
import { Textarea } from "../../components/Textarea"
import ErrorPage from "../ErrorPage"
import { useSecondaryState } from "../../controllers/useSecondaryState"
import { State } from "../../types/State"
import { CMSPageResponse } from "../../components/TypeLookup/types"
import TypeLookup from "../../components/TypeLookup"
import { genericApiDataResponse } from "src/api/shared/types"

type t = ReturnType<typeof useSecondaryState>

function SecondaryPage(props: t): JSX.Element {
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
              inputBoxLabel="🔬 Amino acids:"
              name="aa_field_id"
              id="aa_field_id"
              value={props.aa_field_id}
              onChange={e => {
                props.setAa_field_id(e.target.value)
              }}
            />
            <div className="buttonWithGear">
              <Button
                colours={props.scheme}
                disabled={props.aa_field_id.length < 4}
              />
              {/* <Modal closedChildren={<Gear />} >
                    <div>
                      <Radio label="Single letter code" id="inputtype" name="inputtype" value="s" checked={aaf_field_id === 's'} onClick={((e) => { setAaf_field_id((e.target as HTMLTextAreaElement).value) })} />
                      <Radio label="Three letter code" id="inputtype" name="inputtype" value="t" checked={aaf_field_id === 't'} onClick={((e) => { setAaf_field_id((e.target as HTMLTextAreaElement).value) })} />
                      <Input label="Leniency:" name='leniency' id='leniency' value={leniency.toString()} onChange={((e) => { setLeniency(+e.target.value) })} />
                      <Input label="Detection threshold:" name='detectthreshold' id='detectthreshold' value={detectthreshold.toString()} onChange={((e) => { setDetectthreshold(+e.target.value) })} />
                    </div>
              </Modal> */}
            </div>
          </div>
        </form>
      </div>
    )
  }

  if (props.statePOST.loading) return <Spinner />
  if (props.statePOST.error && props.statePOST.errorMessage)
    return <ErrorPage errorMessage={props.statePOST.errorMessage} errorType='NETWORK' />
  if (props.statePOST.details && props.statePOST.details?.data) {
    const data = props.statePOST.details.data
    return (
      <IslandCenter>
        <div className="secondaryPage">
          <div>
            <div className="resultsScreen">
              {SearchBar(window.outerWidth > 1000)}
            </div>
            <hr />
            <div className="resultsContainer">
              <div className="resultsTitle">Results:</div>
              <div className="mrna-preview">
                <Textarea
                  name="aa"
                  value={data}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
        </div>
      </IslandCenter>
    )
  } else {
    return (
      <IslandCenter>
        <div className="secondaryPage">{SearchBar(true)}</div>
      </IslandCenter>
    )
  }
}

const Enhance = (): JSX.Element => {
  return <SecondaryPage {...useSecondaryState()} />
}

export default Enhance
