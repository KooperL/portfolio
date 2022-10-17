import { useContext, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import Vchart from "../../components/Vchart";
import { fetchFuelPrices } from "../App/api/fuelPricesApi";
import { FuelPricesState, FuelPricesPayload, FuelPricesInitialState } from "./types";
import './style.css';
import { SchemeContext } from "../context/colourScheme";

interface Props {
  dataCall: Function; 
}

function FuelPricesPage(props: Props): JSX.Element {
  const [state, setState] = useState<FuelPricesState>(FuelPricesInitialState);
  const [scheme, setScheme] = useContext(SchemeContext);

  useEffect(() => {
    props.dataCall().then((resp: FuelPricesPayload) => {
      if(resp.success && resp.data) {
        setState({
          details: resp,
          error: false,
          errorMessage: '',
          loading: false
        });
      } else {
        throw new Error(resp.error);
      }
    }).catch((err: any) => {
      setState({
        error: true,
        errorMessage: err,
        loading: false
      });
      let chart:any = document.querySelector("svg");
      if(chart) {
        chart?.setAttribute('width', +chart.getAttribute('width')-100)
      }
    })
  }, [])  
  if(state.loading) {
   return <Spinner/>
  }
  if(state.error) {
    return (
      <div>
        {state.errorMessage}
      </div>
    );
  }
  if(state.details && state.details.data) {
    const data = state.details.data;
    const width = Math.max(window.outerWidth, 1500);
    return (
      <div className="fuelPricesPage">
        <div className="screen">
          <div className="table-container">
            <div className="chart">
              <Vchart
                data={[data.fuelprices.min, data.fuelprices.max, data.fuelprices.average, data.fuelprices.wholesale]}
                cols={['green', 'red', 'blue', 'black']}
                width={width/2}
                height={width/4}
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
          <div className="table-container">
            <div className="table">
              <div className="column">
                <div className="cell header">Today's price</div>
                <div className="cell">{data.stats[0]}</div>
              </div>
              <div className="column">
                <div className="cell header">Price distribution</div>
                <div className="cell">{data.stats[1]}</div>
              </div>
              <div className="column">
                <div className="cell header">Trend</div>
                <div className="cell">{data.stats[3]}</div>
              </div>
              <div className="column">
                <div className="cell header">Suggestion</div>
                <div className="cell">{data.stats[2]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}

const enhance = (): JSX.Element => {
  return(
    <FuelPricesPage dataCall={fetchFuelPrices} />
  ) 
};

export default enhance;