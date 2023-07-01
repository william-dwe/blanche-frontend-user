import { createSlice } from '@reduxjs/toolkit';
import { IGetTransactionListRequest } from '../../../helpers/types';

interface TransactionState {
  params: IGetTransactionListRequest;
}

const initialState: TransactionState = {
  params: {},
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setParams: (state, action) => {
      state.params = { ...action.payload };
    },
  },
});

export const { setParams } = transactionsSlice.actions;

export default transactionsSlice.reducer;
