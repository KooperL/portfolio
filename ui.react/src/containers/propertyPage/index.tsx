import React, { useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import Chart from "react-apexcharts"
import ErrorPage from "../ErrorPage"
import { PageInformation } from "../../containers/context/colourScheme"
import { State } from "../../types/State"
import usePropertyState from "../../controllers/usePropertyState"
import "./style.css"
import { IslandCenter } from "../../templates/IslandCenter"
import { Button } from "../../components/Button"
import { PropertyIndexResponse } from "./types"
import { CMSPageResponse } from "../../components/TypeLookup/types"
import TypeLookup from "../../components/TypeLookup"
import { genericApiDataResponse } from "src/api/shared/types"

interface Props {
  scheme: PageInformation
  state: State<genericApiDataResponse<PropertyIndexResponse>>
  stateCMS: State<CMSPageResponse>
  ref: any
  handleSubmit: () => void
}

function PropertyPage(props: Props): JSX.Element {
  if (props.state.loading) return <Spinner />
  if (props.state.error && props.state.errorMessage)
    return <ErrorPage errorMessage={props.state.errorMessage} errorType='NETWORK' />
  if (props.state.details && props.state.details?.data) {
    const data = props.state.details.data
    return (
      <div className="propertypage">
        <IslandCenter>
          <div className="search-container">
            <div>
              <TypeLookup {...props.stateCMS} />
            </div>
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  props.handleSubmit()
                }}
              >
                <label>Suburb:</label>
                <input
                  className="search-input"
                  type="text"
                  name="prop_suburb"
                  id="prop_suburb"
                  ref={React.forwardRef(props.ref)}
                />
                <Button colours={props.scheme} />
              </form>
            </div>
          </div>

          <div className="content">
            <div className="">
              <div className="spectrum-container">
                <div className="spectrum-legend">
                  <div>$200k</div>
                  <div>$750k</div>
                  <div>$2000k</div>
                </div>
                <div className="spectrum"></div>
              </div>
              <div className="map-container">
                {/* <iframe className="w-full h-full" src="https://api.kooperlingohr.com/heatmap"/> */}
              </div>
            </div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th className="table-row">Suburb</th>
                    <th className="table-row">Median price ($AUD)</th>
                    <th className="table-row">Distance (m)</th>
                    <th className="table-row">Listing frequency</th>
                    <th className="table-row">Trend/Week ($AUD)</th>
                    <th className="table-row">Calculated desirability</th>
                  </tr>
                </thead>
                <tbody>
                  {data.highest.map((topic, indexTopic) => (
                    <tr>
                      <td className="table-row">{topic.suburb}</td>
                      <td className="table-row">{topic.meanMeans}</td>
                      <td className="table-row">{topic.distcc}</td>
                      <td className="table-row">{topic.count}</td>
                      <td className="table-row">{topic.meanGradient}</td>
                      <td className="table-row">{topic.desirability}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="table-legend">
              <p>State Stats</p>
            </div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th className="table-row">Min</th>
                    <th className="table-row">Q1</th>
                    <th className="table-row">Median</th>
                    <th className="table-row">Q3</th>
                    <th className="table-row">Max</th>
                    <th className="table-row">IQR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="table-row">{data.stats.Min}</td>
                    <td className="table-row">{data.stats.Q1}</td>
                    <td className="table-row">{data.stats.median}</td>
                    <td className="table-row">{data.stats.Q3}</td>
                    <td className="table-row">{data.stats.Max}</td>
                    <td className="table-row">{data.stats.IQR}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </IslandCenter>
      </div>
    )
  }
  return <></>
}

const Enhance = (): JSX.Element => {
  return <PropertyPage {...usePropertyState()} />
}

export default Enhance
