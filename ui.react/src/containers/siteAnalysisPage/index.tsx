import React, { useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import { siteAnalysisResp } from "./types"
import { fetchProperty } from "../App/api/propertyApi"
import Chart from "react-apexcharts"
import ErrorPage from "../ErrorPage"
import { useSiteAnalysisState } from "../../controllers/useSiteAnalysisState"
import { State } from "../../types/State"
import { PageInformation } from "../../containers/context/colourScheme"
import { IslandCenter } from "../../templates/IslandCenter"
import { BoxSvg } from "../../controllers/utils/SVGBox"
import ReactApexChart from "react-apexcharts"
import GenerateHeatmap from "../../controllers/utils/heatmap"
import "./style.css"

function generateData(count: number, yrange: { max: number; min: number }) {
  var i = 0
  var series = []
  while (i < count) {
    var x = (i + 1).toString()
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min

    series.push({
      x: x,
      y: y,
    })
    i++
  }
  return series
}

interface Props {
  state: State<siteAnalysisResp>
  scheme: PageInformation
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>
  // ref: any
}

function SiteAnalysisPage(props: Props): JSX.Element {
  if (props.state.loading) return <Spinner />
  if (props.state.error && props.state.errorMessage)
    return <ErrorPage error={props.state.errorMessage} />
  if (props.state.details && props.state.details.data) {
    const data = props.state.details
    props.setLoaded(true)
    return (
      <IslandCenter>
        <div className="siteAnalysis">
          <h1
            className="h1"
            style={{ color: props.scheme.body.h2 }}
          >
            Site analysis
          </h1>
          <p className="h2">Current visitor: {data.data?.fingerprint.uuid}</p>
          <div className="canvasInfo">
            <canvas
              id="myCanvas2"
              width="200"
              height="40"
              style={{ border: "1px solid #000000" }}
            ></canvas>
            {/* <script defer></script> */}
            <p>Canvas hash: {data.data?.fingerprint.CanvasHash}</p>
          </div>
          <div className="usersThis">
            <BoxSvg
              height={data.data?.fingerprint?.actualHeight ?? 1000}
              width={data.data?.fingerprint?.actualWidth ?? 1000}
              color={props.scheme.body.foreground}
              lineColor={props.scheme.body.text}
            />
            <div className="usersExtra">
              <p>IP: {data.data?.fingerprint.ip}</p>
              <p>Browser: {data.data?.fingerprint.browser}</p>
              <p>Platform: {data.data?.fingerprint.platform}</p>
            </div>
          </div>
          <p className="h2">Your most explored pages</p>
          <div className="userPageInfo">
            <table>
              <thead>
                <td>Page</td>
                <td>Count</td>
              </thead>
              <tbody>
                {data.data?.pages.map((item, ind) => (
                  <tr key={ind}>
                    <td>{item.page}</td>
                    <td>{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="allPageInfo">
            <p className="h2">All page redirects</p>
            <GenerateHeatmap
              // @ts-ignore typescript demonstrating it has the mental capacity of a carboard box
              data={(data.data as siteAnalysisResp["data"]).siteTraffic.map(
                item => ({
                  x: item.source,
                  y: item.destination,
                  value: item.count / 100,
                }),
              )}
            />
          </div>
        </div>
      </IslandCenter>
    )
  }
  return <></>
}

const Enhance = (): JSX.Element => {
  return <SiteAnalysisPage {...useSiteAnalysisState()} />
}

export default Enhance
