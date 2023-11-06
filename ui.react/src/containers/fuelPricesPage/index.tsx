import { useContext, useEffect, useState } from 'react'
import Spinner from '../../components/Spinner'
import Vchart from '../../components/Vchart'
import './style.css'
import {
  PageInformation,
  SchemeContext,
} from '../../state/colorScheme/colourScheme'
import { IslandCenter } from '../../templates/IslandCenter'
import ErrorPage from '../ErrorPage'
import { State } from '../../types/State'
import useFuelPricesState from '../../controllers/useFuelPricesState'
import TypeLookup from '../../components/TypeLookup'

type t = ReturnType<typeof useFuelPricesState>

function FuelPricesPage(props: t): JSX.Element {
  if (props.state.loading) return <Spinner />
  if (props.state.error && props.state.errorMessage)
    return (
      <ErrorPage
        errorMessage={props.state.errorMessage}
        errorType="NETWORK"
      />
    )

  if (props.state.details && props.state?.details.data) {
    const data = props.state.details.data
    const width = Math.max(window.outerWidth, 1500)

    return (
      <IslandCenter>
        <div className="fuelPricesPage">
          <TypeLookup {...props.stateCMS} />
          <div className="table-container">
            <div className="chart">
              <Vchart
                data={[
                  data.fuelprices.min,
                  data.fuelprices.max,
                  data.fuelprices.average,
                  data.fuelprices.wholesale,
                ]}
                cols={['green', 'red', 'blue', 'black']}
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
              'Should buy?': data.stats.decision.toString(),
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

const Enhance = (): JSX.Element => {
  return <FuelPricesPage {...useFuelPricesState()} />
}

export default Enhance
