import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/Store';
import { useCallback, useEffect, useState } from 'react';

import { config } from '../App';
import { setCounter } from '../redux/slices/CounterSlice';
import MainNav from '../components/MainNav';
import Table from '../components/Table';
import LineChart from '../components/LineChart';
import React from 'react';

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
  const [activeTab, setActiveTab] = useState('tab1');

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
    <div className="relative  min-h-screen w-full flex-col items-center justify-center">
      <header className="supports-backdrop-blur:bg-white/60 sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur">
        <div className="flex h-14 w-full items-center px-10">
          <MainNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </header>
      <div className="w-full flex-1 px-6 sm:px-16">
        {activeTab === 'tab1' ? (
          <div>
            <LineChart data={data} />

            <div>
              <div className="flex py-2">
                <text className="pr-2">Latest value:</text>
                <div>
                  {counter.data.length !== 0
                    ? counter.data[counter.data.length - 1].value
                    : 0}
                </div>
              </div>

              <div className="flex pb-2">
                <text className="pr-2">Process:</text>
                <div>{intervalId ? 'ON' : 'OFF'}</div>
              </div>
              <button
                className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 rounded-lg bg-[#10BFFC] px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                onClick={handleClick}
              >
                Toggle generation
              </button>
            </div>
          </div>
        ) : (
          <div>
            <Table
              data={counter.data.map((d) => {
                return {
                  time: `${formatDate(d.time)}`,
                  value: d.value,
                  text: 'Generated value',
                };
              })}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Generator;
