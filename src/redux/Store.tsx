import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/CounterSlice';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: counterReducer,
  middleware: [thunk],
});

store.subscribe(() => {
  localStorage.setItem('genState', JSON.stringify(store.getState().data));
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
