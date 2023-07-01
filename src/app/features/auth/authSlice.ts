import { createSlice } from '@reduxjs/toolkit';
import {
  IGetProfileResponse,
  IMerchantInfoResponse,
} from '../../../helpers/types';
import Cookies from 'universal-cookie';

interface StateProps {
  user: IGetProfileResponse | null;
  merchant: IMerchantInfoResponse | null;
  isLoggedIn: boolean;
}

const cookie = new Cookies();

const initialState: StateProps = {
  user: null,
  merchant: null,
  isLoggedIn: cookie.get('is_user_logged_in'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setMerchant: (state, action) => {
      state.merchant = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.merchant = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logout, setIsLoggedIn, setMerchant } =
  authSlice.actions;

export default authSlice.reducer;
