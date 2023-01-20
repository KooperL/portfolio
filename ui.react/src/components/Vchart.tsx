 // @ts-nocheck

import {VictoryLine, VictoryAxis, VictoryChart, VictoryLegend, VictoryVoronoiContainer, VictoryTooltip} from 'victory';
import React from "react";

interface Props {
  data: any;
  cols: string[];
  width: number;
  height: number;
}

export default function Vchart(props) {
  return (
      <VictoryChart
          // height={props.height ?? 150}
          // width={props.width ?? 200}
          // containerComponent={
          //   <VictoryVoronoiContainer voronoiDimension="x"
          //   labels={({ datum }) => `y: ${datum.y}`}
          //   labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "white"}}/>}
          //   />
          // }
        >
        <VictoryLegend x={50} y={50}
          orientation="horizontal"
          title="Legend"
          centerTitle
          gutter={30}
          style={{ border: { stroke: "black" }, title: {fill: 'white'}}}
          data={[
          { name: "Max", symbol: { fill: "red" }, labels: {fill: 'white'} },
          { name: "Average", symbol: { fill: "blue" }, labels: {fill: 'white'} },
          { name: "Min", symbol: { fill: "black" }, labels: {fill: 'white'} },
          { name: "Wholesale", symbol: { fill: "green" }, labels: {fill: 'white'} }
          ]}
        />

        <VictoryAxis 
          label="Days"
          style={{
            axis: {stroke: "#756f6a"},
            axisLabel: {padding: 50, fill: 'white'},
            grid: {stroke: ({ tick }) => tick > 0.5 ? "grey" : "grey"},
            ticks: {stroke: "grey", size: 6},
            tickLabels: {padding: 0, fill: 'white'}
          }}
          // tickFormat={(t) => t}
          tickFormat={(t) => `${t.slice(6,12)}`}
          tickCount={5}/>
        {props.data.map((set, ind) =>(
          <VictoryLine
            data={set}
            key={ind}
            style={{
              data: { stroke: props.cols[ind] || 'black', strokeWidth: ({ active }) => active ? 0.5 : 1.0},
              labels: {fill: props.cols[ind] || 'black'}
            }}
          />
        ))}
        <VictoryAxis dependentAxis 
          label="Price, c"
          style={{
            axis: {stroke: "#756f6a"},
            axisLabel: {padding: 50, fill: 'white'},
            ticks: {stroke: "grey", size: 6},
            tickLabels: {padding: 0, fill: 'white'}
          }}
          tickCount={5}/>
      </VictoryChart>
  )
}
