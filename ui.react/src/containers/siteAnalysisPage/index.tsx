import React, { useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import Chart from "react-apexcharts"
import ErrorPage from "../ErrorPage"
import { useSiteAnalysisState } from "../../controllers/useSiteAnalysisState"
import { IslandCenter } from "../../templates/IslandCenter"
import { BoxSvg } from "../../controllers/utils/SVGBox"
import ReactApexChart from "react-apexcharts"
import GenerateHeatmap from "../../controllers/utils/heatmap"
import "./style.css"
import TypeLookup from "../../components/TypeLookup"

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

type t = ReturnType<typeof useSiteAnalysisState>

function SiteAnalysisPage(props: t): JSX.Element {
  if (props.state.loading) return <Spinner />
  if (props.state.error && props.state.errorMessage)
    return (
      <ErrorPage
        errorMessage={props.state.errorMessage}
        errorType="NETWORK"
      />
    )
  if (props.state.details && props.state.details?.data) {
    const data = props.state.details.data
    props.setLoaded(true)
    return (
      <IslandCenter>
        <div className="siteAnalysis">
          <TypeLookup {...props.stateCMS} />
          <p className="h2">Current visitor: {data?.fingerprint.uuid}</p>
          <div className="canvasInfo">
            <canvas
              id="myCanvas2"
              width="200"
              height="40"
              style={{ border: "1px solid #000000" }}
            ></canvas>
            {/* <script defer></script> */}
            <p>Canvas hash: {data?.fingerprint.CanvasHash}</p>
          </div>
          <div className="usersThis">
            <BoxSvg
              height={data?.fingerprint?.actualHeight ?? 1000}
              width={data?.fingerprint?.actualWidth ?? 1000}
              color={props.scheme.body.foreground}
              lineColor={props.scheme.body.text}
            />
            <div className="usersExtra">
              <p>IP: {data?.fingerprint.ip}</p>
              <p>Browser: {data?.fingerprint.browser}</p>
              <p>Platform: {data?.fingerprint.platform}</p>
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
                {data?.pages.map((item, ind) => (
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
              data={(data as siteAnalysisResp["data"]).siteTraffic.map(
                (item: any) => ({
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
