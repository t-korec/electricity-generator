import { applyMiddleware, createStore } from '@reduxjs/toolkit';
// This is how you import a reducer, based on the prior export.
import counterReducer from '../modules/Generator/CounterSlice';
import thunk from 'redux-thunk';

const store = createStore(counterReducer, applyMiddleware(thunk));

store.subscribe(() => {
  localStorage.setItem('genState', JSON.stringify(store.getState().data));
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
