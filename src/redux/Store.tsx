import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import counterReducer from './slices/CounterSlice';
import thunk from 'redux-thunk';

const store = createStore(counterReducer, applyMiddleware(thunk));

store.subscribe(() => {
  localStorage.setItem('genState', JSON.stringify(store.getState().data));
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
