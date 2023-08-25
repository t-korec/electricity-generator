import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/Store';
import { setCounter } from './Generator/CounterSlice';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from '@visx/xychart';
import { config } from '../App';

const formatDate = (dateToFormat: string | Date) => {
  let date = dateToFormat;
  if (typeof date === 'string') {
    date = new Date(dateToFormat);
  }
  var datestring =
    ('0' + date.getDate()).slice(-2) +
    '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '-' +
    date.getFullYear() +
    ' ' +
    ('0' + date.getHours()).slice(-2) +
    ':' +
    ('0' + date.getMinutes()).slice(-2) +
    ':' +
    ('0' + date.getSeconds()).slice(-2);
  return datestring;
};

const accessors = {
  xAccessor: (d: any) => d.x,
  yAccessor: (d: any) => d.y,
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
            data={data.length === 0 ? [{ x: 0, y: 0 }] : data}
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
                {accessors.xAccessor(tooltipData?.nearestDatum?.datum)}
                {', '}
                {accessors.yAccessor(tooltipData?.nearestDatum?.datum)}
              </div>
            )}
          />
        </XYChart>
      </div>
    </div>
  );
};

function genRand(min: number, max: number, decimalPlaces: number) {
  var rand =
    Math.random() < 0.5
      ? (1 - Math.random()) * (max - min) + min
      : Math.random() * (max - min) + min; // could be min or max or anything in between
  var power = Math.pow(10, decimalPlaces);
  return Math.floor(rand * power) / power;
}

const Generator = () => {
  const counter = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const [intervalId, setIntervalId] = useState(0);

  const handleClick = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }

    const newIntervalId = setInterval(() => {
      const value = genRand(
        config.generator.range.min,
        config.generator.range.max,
        config.generator.range.decimals,
      );
      const time = new Date();

      dispatch(setCounter({ time, value }));
    }, config.generator.timeInterval);
    setIntervalId(newIntervalId as any);
  }, [intervalId, setIntervalId]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(0);
        return;
      }
    };
  }, []);

  const data = counter.data.map((d) => {
    return {
      x: `${formatDate(d.time)}`,
      y: d.value,
    };
  });

  return (
    <div>
      <LineChart data={data} />
      <div>
        Latest value :
        <>
          {counter.data.length !== 0
            ? counter.data[counter.data.length - 1].value
            : 0}
        </>
        <div>
          Process: <>{intervalId ? 'ON' : 'OFF'}</>
        </div>
        <button
          className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 rounded-lg bg-[#10BFFC] px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
          onClick={handleClick}
        >
          Start generating
        </button>
        <div>
          {counter.data.map((d) => (
            <div key={`id-${d.time}`}>{`${formatDate(d.time)}: ${
              d.value
            }`}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Generator;
