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
import { PageInformation } from "../../containers/context/colourScheme"
import { State } from "../../types/State"
import usePropertyState from "../../controllers/usePropertyState"
import './style.css'
import { IslandCenter } from "../../templates/IslandCenter"
import { Button } from "../../components/Button"


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
    const data = props.state.details as PropertyPayload
    return (
      <div className="propertypage">
        <IslandCenter>
       <div className="search-container">
         <div>
           <p>
             Enter the name of a suburb in Victoria to see a detailed
             profile.
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
               className="search-input"
               type="text"
               name="prop_suburb"
               id="prop_suburb"
                ref={props.ref}
             />
             <Button
                colours={props.scheme}
             />
           </form>
         </div>
       </div>

       <div className="content">
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
