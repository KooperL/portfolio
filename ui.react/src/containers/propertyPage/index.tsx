import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { 
  PropertyPayload,
  PropertyState,
  PropertyInitialState,
  PropertyPOST,
  PropertySearchPayload
 } from "./types";
import { fetchProperty } from "../App/api/propertyApi";
import Chart from "react-apexcharts";

interface Props {
  dataCall: Function; 
}

function PropertyPage(props: Props): JSX.Element {
  const [state, setState] = useState<PropertyState>(PropertyInitialState);
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<any>();

  useEffect(() => {
    setState({...state, loading: true});
    props.dataCall().then((resp: PropertyPayload) => {
      setState({
        details: resp,
        error: false,
        errorMessage: '',
        loading: false
      });
    }).catch((err: any) => {
      setState({
        error: true,
        errorMessage: err,
        loading: false
      });
    })
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, payload: PropertyPOST) => {
    setState({...state, loading: true});
    event.preventDefault();
    props.dataCall(payload).then((resp: PropertySearchPayload) => {
      setState({
        details: resp,
        error: false,
        errorMessage: '',
        loading: false
      });
      console.log(resp)
      if(resp.data?.details) {
        const means = resp.data.details.pricedata.means;
        const stds = resp.data.details.pricedata.stds;
        setOptions({
          options: {
            chart: {
              id: "Props",
              toolbar: {
                show: true,
              },
              export: {
                png: {
                  filename: undefined,
                }
              },
            },
            colors: ['#008FFB', '#00E396', '#ffffff'],
            xaxis: {
              categories: resp.data.details.pricedata.datekey,
              tickAmount: 4,
            },
            grid: {
              yaxis: {
                lines: {
                  show: false
                },
              }
            },
            yaxis: {
              min: 0,
              max: 1500000,
              tickAmount: 3,
            },
            stroke: {
              width: [2,0,0]
            },
            fill: {
              type: ['solid', 'gradient', 'solid'],
              gradient: {
                inverseColors: false,
                type: 'vertical',
                opacityFrom: 0.5,
                opacityTo: 1,
                stops: stds.map(function(val, ind) {return means[ind]-val})
              },
              solid: {
                opacity: 0,
              },
            },
          },
          series: [
            {
              name: 'means',
              type: 'line',
              // color: 'blue',
              data: means
            },
            {
              name: 'stdsHigh',
              type: 'area',
              // color: 'red',
              data: stds.map(function(val, ind) {return val+means[ind]})
            },
            {
              name: 'stdsLow',
              type: 'area',
              // color: 'white',
              data: stds.map(function(val, ind) {return means[ind]-val})
            },
          ],
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
    })
  }
  
  
  if(state.loading) {
   return <Spinner/>
  }
  if(state.error) {
    return (
      <div>
        {JSON.stringify(state.errorMessage)}
      </div>
    );
  }
  if(state.details && state.details.data) {
    if(Object.keys(state.details.data).includes('suburb')) {
      const data = state.details as PropertySearchPayload;
      // @ts-ignore
      const stats = data.data.stats
      return (
        <div className="flex justify-center">
          <div className="w-fit flex flex-col">
            <div className="flex justify-center">
              <div className="p-5">
                <table>
                  <thead>
                    <tr>
                      <th className="px-2">Median price ($AUD)</th>
                      <th className="px-2">Price SD ($AUD)</th>
                      <th className="px-2">Distance (m)</th>
                      <th className="px-2">Listing frequency</th>
                      <th className="px-2">Trend ($AUD)</th>
                      <th className="px-2">Calculated desirability</th>
                    </tr>
                  </thead>
                  <tr>
                    <td className="px-2">{ stats.mean}</td>
                    <td className="px-2">{ stats.spread }</td>
                    <td className="px-2">{ stats.distance }</td>
                    <td className="px-2">{ stats.listingsCaptured }</td>
                    <td className="px-2">{ stats.linearGradient }</td>
                    <td className="px-2">{ stats.linearGradient }</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-fit">
                <Chart
                  options={options['options']}
                  series={options['series']}
                  width="600"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-fit">
                <iframe width="600" height="450" title='iframe' src=
                  {`https://maps.google.com/maps?width=150&amp;height=50&amp;hl=en&amp;q=${value}%20Victoria%20Australia&amp;ie=UTF8&amp;t=&amp;z=8&amp;iwloc=B&amp;output=embed`}
                frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0}></iframe>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      const data = state.details as PropertyPayload
      return (
        <div className="">
          <div className="flex flex-row justify-center items-center gap-24 pb-24">
            <div>
              <p>Enter the name of a suburb in Victoria to see a detailed profile.</p>
            </div>
            <div>
              <form onSubmit={((e) => handleSubmit(e, {
                prop_suburb: value
              }))}>
                <label>Suburb:</label>
                <input className='ml-2 bg-gray-100 rounded' type='text' name='prop_suburb' id='prop_suburb' value={value} onChange={((e) => {setValue(e.target.value)})} />
                <button className="bg-blue-400 m-5 p-1 rounded text-white" type='submit' name='submit' placeholder="Melbourne" value='Submit'>Submit</button>
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
                          <td className="px-2">{ topic.suburb }</td>
                          <td className="px-2">{ topic.meanMeans }</td>
                          <td className="px-2">{ topic.distcc }</td>
                          <td className="px-2">{ topic.count }</td>
                          <td className="px-2">{ topic.meanGradient }</td>
                          <td className="px-2">{ topic.desirability }</td>
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
                      <td className="px-2">{ data.data.stats.Min }</td>
                      <td className="px-2">{ data.data.stats.Q1 }</td>
                      <td className="px-2">{ data.data.stats.median }</td>
                      <td className="px-2">{ data.data.stats.Q3 }</td>
                      <td className="px-2">{ data.data.stats.Max }</td>
                      <td className="px-2">{ data.data.stats.IQR }</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="w-fill h-full">
        <div className="h-screen grid grid-cols-1 gap-1 content-center">
          <div className="flex justify-center">
            <div className="flex flex-wrap">
              <div className="text-xl text-center w-1/2 flex-no-shrink">
                <p>Enter the name of a suburb in Victoria to see a detailed profile.</p>
              </div>
              <div>
              <form onSubmit={((e) => handleSubmit(e, {
                prop_suburb: value
              }))}>
                  <label>Suburb:</label>
                  <input className='ml-2 bg-gray-100 rounded' type='text' name='prop_suburb' id='prop_suburb' value={value} onChange={((e) => {setValue(e.target.value)})} />
                  <button className="bg-blue-400 m-5 p-1 rounded text-white" type='submit' name='submit' value='Submit'>Submit</button>
                </form>
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
    <PropertyPage dataCall={fetchProperty} />
  ) 
};

export default enhance;