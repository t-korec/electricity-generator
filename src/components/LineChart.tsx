import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from '@visx/xychart';

const accessors = {
  xAccessor: (d: { x: string; y: number }) => d.x,
  yAccessor: (d: { x: string; y: number }) => d.y,
};

const LineChart = ({
  data,
}: {
  data: {
    x: string;
    y: number;
  }[];
}) => {
  return (
    <div className="overflow-x-scroll">
      <div className="w-[1800px] overflow-x-scroll">
        <XYChart
          height={300}
          xScale={{ type: 'band' }}
          yScale={{ type: 'linear' }}
        >
          <AnimatedAxis orientation="bottom" />
          <AnimatedGrid columns={false} numTicks={4} />
          <AnimatedLineSeries
            dataKey="Line 1"
            data={data.length === 0 ? [{ x: '0', y: 0 }] : data}
            {...accessors}
          />
          <Tooltip
            snapTooltipToDatumX
            snapTooltipToDatumY
            showVerticalCrosshair
            showSeriesGlyphs
            renderTooltip={({ tooltipData, colorScale }) => (
              <div>
                <div
                  style={
                    colorScale && {
                      color: colorScale(tooltipData?.nearestDatum?.key ?? ''),
                    }
                  }
                >
                  {tooltipData?.nearestDatum?.key}
                </div>
                {tooltipData?.nearestDatum?.datum
                  ? accessors.xAccessor(tooltipData?.nearestDatum?.datum)
                  : '0'}
                {', '}
                {tooltipData?.nearestDatum?.datum
                  ? accessors.yAccessor(tooltipData?.nearestDatum?.datum)
                  : '0'}
              </div>
            )}
          />
        </XYChart>
      </div>
    </div>
  );
};

export default LineChart;
