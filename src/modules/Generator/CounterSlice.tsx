import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ParserStorageEl {
  time: string;
  value: number;
}

interface InitialState {
  time: Date;
  value: number;
}
const UpdateCounterAction: string = 'Counter';

const initialState: { data: InitialState[] } = {
  data: JSON.parse(localStorage.getItem('genState') ?? '[]'),
};

export const counterSlice = createSlice({
  name: UpdateCounterAction,
  initialState: initialState,
  reducers: {
    setCounter: (
      state,
      action: PayloadAction<{ time: Date; value: number }>,
    ) => {
      if (state.data.length === 10) {
        return Object.assign({}, state, {
          data: [...state.data.slice(1, 10), action.payload],
        });
      }
      state.data.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCounter } = counterSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default counterSlice.reducer;
