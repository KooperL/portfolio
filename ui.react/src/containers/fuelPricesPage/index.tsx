import { useContext, useEffect, useState } from "react"
import Spinner from "@components/Spinner"
import Vchart from "@components/Vchart"
import { fetchFuelPrices } from "../App/api/fuelPricesApi"
import {
  FuelPricesState,
  FuelPricesPayload,
  FuelPricesInitialState,
} from "./types"
import "./style.css"
import { SchemeContext } from "../context/colourScheme"
import { IslandCenter } from "@templates/IslandCenter"
import ErrorPage from "../ErrorPage"

interface Props {
  dataCall: Function
}

function FuelPricesPage(props: Props): JSX.Element {
  const [state, setState] = useState<FuelPricesState>(FuelPricesInitialState)
  const [scheme, setScheme] = useContext(SchemeContext)

  useEffect(() => {
    props
      .dataCall()
      .then((resp: FuelPricesPayload) => {
        if (resp.success && resp.data) {
          setState({
            details: resp,
            error: false,
            errorMessage: null,
            loading: false,
          })
        } else {
          throw new Error(resp.error)
        }
      })
      .catch((err: any) => {
        setState({
          error: true,
          errorMessage: err,
          loading: false,
        })
        let chart: any = document.querySelector("svg")
        if (chart) {
          chart?.setAttribute("width", +chart.getAttribute("width") - 100)
        }
      })
  }, [])

  if (state.loading) return <Spinner />
  if (state.error && state.errorMessage)
    return <ErrorPage error={state.errorMessage} />
  if (state.details && state.details.data) {
    const data = state.details.data
    const width = Math.max(window.outerWidth, 1500)
    return (
      <IslandCenter>
        <div className="fuelPricesPage">
          <div className="table-container">
            <div className="chart">
              <Vchart
                data={[
                  data.fuelprices.min,
                  data.fuelprices.max,
                  data.fuelprices.average,
                  data.fuelprices.wholesale,
                ]}
                cols={["green", "red", "blue", "black"]}
                width={width / 2}
                height={width / 4}
              />
              {/* <Line data={{
                labels: this.state.data.fuelprices.average.map(e => {return e.x}),
                datasets: [{ 
                  data: this.state.data.fuelprices.average.map(e => {return e.y}),
                  label: "Daily growth",
                  borderColor: "#3e95cd",
                  backgroundColor: "#7bb6dd",
                  fill: false,
                },],
              }} options={{
                scales: {
                  x: {
                    ticks: {
                      callback: function(val, index) {
                        let temp = new Date(this.getLabelForValue(val)*1000);
                        // console.log(temp)
                        return temp.toDateString().slice(0,-5);
                        // return temp;
                      }
                    }
                  }
                }
              }} /> */}
            </div>
          </div>
          <div className="table">
            {Object.entries({
              "Today's price": data.stats.average.toFixed(2),
              Skew: data.stats.relativePrice.toFixed(2),
              Trend: data.stats.gradient.toFixed(2),
              "Should buy?": data.stats.decision.toString(),
            }).map((item, itemInd) => (
              <div
                className="column"
                key={itemInd}
              >
                <div className="cell header">{item[0]}</div>
                <div className="cell">{item[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </IslandCenter>
    )
  }
  return <></>
}

const enhance = (): JSX.Element => {
  return <FuelPricesPage dataCall={fetchFuelPrices} />
}

export default enhance
