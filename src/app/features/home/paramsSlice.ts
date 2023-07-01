import { createSlice } from '@reduxjs/toolkit';
import { IParams } from '../../../helpers/types';

interface SearchState {
  search: IParams;
}

const initialState: SearchState = {
  search: {},
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setParams: (state, action) => {
      state.search = { ...action.payload };
    },
    setSearch: (state, action) => {
      state.search = { q: action.payload };
    },
  },
});

export const { setSearch, setParams } = searchSlice.actions;

export default searchSlice.reducer;
