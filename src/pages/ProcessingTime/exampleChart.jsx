<svg width={350} height={300}>
<VictoryPie
  labelComponent={<VictoryLabel dy={30} />}
  standalone={false}
  width={280}
  height={300}
  innerRadius={80}
  endAngle={80}
  startAngle={-110}
  padAngle={2}
  colorScale={graphicColorMain}
  data={graphicData}
  padding={5}
  labels={d => `${d.agent} : ${d.reqCount}`}
  style={{
    labels: { fontSize: 15, fontWeight: '400', height: 10 },
    data: {
      fillOpacity: 0.7,
    },
  }}
/>
<VictoryLabel
  textAnchor="middle"
  style={{ fontSize: 30, border: '1px solid #ccc' }}
  x={140}
  y={140}
  text="620"
/>
<VictoryPie
  standalone={false}
  width={300}
  height={315}
  innerRadius={65}
  endAngle={130}
  startAngle={-130}
  colorScale={graphicColor}
  style={{ fontSize: 30, Opacity: 0.1, border: '1px solid #ccc' }}
/>
<svg/>