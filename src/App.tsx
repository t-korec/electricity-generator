import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
import React, { ReactElement, useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/Store';

export const config = {
  apiToken: import.meta.env.VITE_TOKEN,
  paths: {
    signIn: '/',
    register: '/register',
    app: '/g',
    generator: '/g/generator',
    table: '/g/table',
  },
  localStorage: {
    authKey: 'authorized',
    reduxGeneratorState: 'genState',
  },
  generator: {
    timeInterval: 1000,
    range: {
      min: 0.0,
      max: 89.99,
      decimals: 2,
    },
  },
  url: 'https://siemensanalyse.com/TenderProcess2023',
} as const;

const Login = loadable(() => import('./modules/Login'));
const Register = loadable(() => import('./modules/Register'));
const NotFound = loadable(() => import('./modules/NotFound'));
const Public = loadable(() => import('./layouts/Public'));
const Private = loadable(() => import('./layouts/Private'));
const Generator = loadable(() => import('./modules/Generator'));
const Table = loadable(() => import('./modules/Table'));

function App(): ReactElement {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<Public />}>
            <Route path={config.paths.signIn} element={<Login />} />
            <Route path={config.paths.register} element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* Private Routes */}
          <Route path={config.paths.app} element={<Private />}>
            <Route path={config.paths.generator} element={<Generator />} />
            <Route path={config.paths.table} element={<Table />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
