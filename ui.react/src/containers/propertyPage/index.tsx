import React, { useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import {
  PropertyPayload,
  PropertyState,
  PropertyInitialState,
  PropertyPOST,
  PropertySearchPayload,
} from "./types"
import { fetchProperty } from "../App/api/propertyApi"
import Chart from "react-apexcharts"
import ErrorPage from "../ErrorPage"
import { PageInformation } from "@containers/context/colourScheme"
import { HomePayload } from "@containers/homePage/types"
import { State } from "../../types/State"
import usePropertyState from "@controllers/usePropertyState"

interface Props {
  scheme: PageInformation
  state: State<PropertyPayload>
  ref: any
  handleSubmit: () => void
}

function PropertyPage(props: Props): JSX.Element {
  if (props.state.loading) return <Spinner />
  if (props.state.error && props.state.errorMessage)
    return <ErrorPage error={props.state.errorMessage} />
  if (props.state.details && props.state.details.data) {
    const options = {
      options: {
        chart: {
          id: "Props",
          toolbar: {
            show: true,
          },
          export: {
            png: {
              filename: undefined,
            },
          },
        },
        colors: ["#008FFB", "#00E396", "#ffffff"],
        xaxis: {
          categories: props.state.details.data.pricedata.datekey,
          tickAmount: 4,
        },
        grid: {
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        yaxis: {
          min: 0,
          max: 1500000,
          tickAmount: 3,
        },
        stroke: {
          width: [2, 0, 0],
        },
        fill: {
          type: ["solid", "gradient", "solid"],
          gradient: {
            inverseColors: false,
            type: "vertical",
            opacityFrom: 0.5,
            opacityTo: 1,
            stops: stds.map(function (val, ind) {
              return means[ind] - val
            }),
          },
          solid: {
            opacity: 0,
          },
        },
      },
      series: [
        {
          name: "means",
          type: "line",
          // color: 'blue',
          data: means,
        },
        {
          name: "stdsHigh",
          type: "area",
          // color: 'red',
          data: stds.map(function (val, ind) {
            return val + means[ind]
          }),
        },
        {
          name: "stdsLow",
          type: "area",
          // color: 'white',
          data: stds.map(function (val, ind) {
            return means[ind] - val
          }),
        },
      ],
    }
    const data = props.state.details
    return (
      <div>
        <div className="">
          <div className="flex flex-row justify-center items-center gap-24 pb-24">
            <div>
              <p>
                Enter the name of a suburb in Victoria to see a curated profile.
              </p>
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
                  className="ml-2 bg-gray-100 rounded"
                  type="text"
                  ref={props.ref}
                  name="prop_suburb"
                  id="prop_suburb"
                />
                <button
                  className="bg-blue-400 m-5 p-1 rounded text-white"
                  type="submit"
                  name="submit"
                  placeholder="Melbourne"
                  value="Submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-wrap justify-evenly">
            <div className="">
              <div className="w-96 h-1/2">
                <div className="flex justify-between">
                  <div>$200k</div>
                  <div>$750k</div>
                  <div>$2000k</div>
                </div>
                <div className="bg-gradient-to-r from-blue-500 via-green-500 to-red-500 p-2"></div>
                <div className="bg-gray-200 w-full h-96 mt-24">
                  {/* <iframe className="w-full h-full" src="https://api.kooperlingohr.com/heatmap"/> */}
                </div>
              </div>
            </div>
            <div className="content-around">
              <div className="py-10">
                <div className="pb-5">
                  <p>My picks</p>
                </div>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th className="px-2">Suburb</th>
                        <th className="px-2">Median price ($AUD)</th>
                        <th className="px-2">Distance (m)</th>
                        <th className="px-2">Listing frequency</th>
                        <th className="px-2">Trend/Week ($AUD)</th>
                        <th className="px-2">Calculated desirability</th>
                      </tr>
                    </thead>
                    {data.data.highest.map((topic, indexTopic) => (
                      <tr>
                        <td className="px-2">{topic.suburb}</td>
                        <td className="px-2">{topic.meanMeans}</td>
                        <td className="px-2">{topic.distcc}</td>
                        <td className="px-2">{topic.count}</td>
                        <td className="px-2">{topic.meanGradient}</td>
                        <td className="px-2">{topic.desirability}</td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
              <div className="py-10">
                <div className="pb-5">
                  <p>State Stats</p>
                </div>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th className="px-2">Min</th>
                        <th className="px-2">Q1</th>
                        <th className="px-2">Median</th>
                        <th className="px-2">Q3</th>
                        <th className="px-2">Max</th>
                        <th className="px-2">IQR</th>
                      </tr>
                    </thead>
                    <tr>
                      <td className="px-2">{data.data.stats.Min}</td>
                      <td className="px-2">{data.data.stats.Q1}</td>
                      <td className="px-2">{data.data.stats.median}</td>
                      <td className="px-2">{data.data.stats.Q3}</td>
                      <td className="px-2">{data.data.stats.Max}</td>
                      <td className="px-2">{data.data.stats.IQR}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return <></>
}

const enhance = (): JSX.Element => {
  return <PropertyPage {...usePropertyState()} />
}

export default enhance
