interface Props {
  height: number
  width: number
  color: string
  lineColor: string
}

export const BoxSvg: React.FC<Props> = ({
  height,
  width,
  color,
  lineColor,
}) => {
  const fontSize = Math.min(height, width) / 10
  const lineWidth = Math.min(height, width) / 50

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={color}
        stroke="black"
        strokeWidth={2}
      />
      <line
        x1={width}
        y1={height / 2}
        x2={lineWidth * 10}
        y2={height / 2}
        stroke={lineColor}
        strokeWidth={lineWidth}
        markerEnd="url(#arrow)"
      />
      <line
        x1={width / 2}
        y1={height}
        x2={width / 2}
        y2={lineWidth * 10}
        stroke={lineColor}
        strokeWidth={lineWidth}
        markerEnd="url(#arrow)"
      />
      <text
        x={width - fontSize * 2}
        y={height / 2 + fontSize}
        fontSize={fontSize}
        fill={lineColor}
      >
        {width}
      </text>
      <text
        x={width / 2 + fontSize / 2}
        y={height - fontSize}
        fontSize={fontSize}
        fill={lineColor}
      >
        {height}
      </text>
      <defs>
        <marker
          id="arrow"
          markerWidth={10}
          markerHeight={10}
          refX={0}
          refY={5}
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path
            d="M0,0 L0,10 L10,5 z"
            fill={lineColor}
          />
        </marker>
      </defs>
    </svg>
  )
}
