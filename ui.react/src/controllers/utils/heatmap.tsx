import { SchemeContext } from '../../state/colorScheme/colourScheme'
import React, { useContext, useState } from 'react'
import './style.css'

interface HeatmapData {
  x: number
  y: number
  value: number
}

const GenerateHeatmap = (props: { data: HeatmapData[] }) => {
  const [scheme, setScheme] = useContext(SchemeContext)

  let xAxis = new Set(props.data.map((item, ind) => item.x))
  let yAxis = new Set(props.data.map((item, ind) => item.y))

  // @ts-ignore
  const xAxisArr = [...xAxis]
  // @ts-ignore
  const yAxisArr = [...yAxis]

  const max = Math.max(
    xAxisArr.reduce(
      (total, item) => (total < item.length ? item.length : total),
      0,
    ),
    yAxisArr.reduce(
      (total, item) => (total < item.length ? item.length : total),
      0,
    ),
  )
  const style = {
    '--table-heading': `${max * 8}px`,
    '--cell-dims': `${max - 2}px`,
  } as React.CSSProperties

  let arr: number[][] = new Array(xAxisArr.length)
    .fill([])
    .map(() => new Array(yAxisArr.length).fill(0))
  props.data.map((item, ind) => {
    arr[xAxisArr.indexOf(item.x)][yAxisArr.indexOf(item.y)] = item.value
  })

  console.log(yAxisArr, arr)

  return (
    <div
      className="heatmap"
      style={{ ...style, backgroundColor: scheme.body.foreground }}
    >
      <div className="row">
        <div className="header"></div>
        {yAxisArr.map(item => (
          <div className="rotated">{item}</div>
        ))}
      </div>
      {arr.map((item, ind) => (
        <div className="row">
          <div className="header">{xAxisArr[ind]}</div>
          {item.map((subItem, subInd) => (
            <div
              className="cell"
              style={{ backgroundColor: scheme.body.text, opacity: subItem }}
            >
              {/* {subItem} */}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default GenerateHeatmap
