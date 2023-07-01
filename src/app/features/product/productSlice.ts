import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productInfo: {
    product: null,
    variant: null,
    isDiscount: false,
    isRangePrice: false,
    price: null,
    discountPrice: null,
    stock: null,
    activeImage: null,
    isLoading: false,
    isHaveVariant: false,
  },
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductInfo: (state, action) => {
      state.productInfo = {
        ...state.productInfo,
        ...action.payload,
      };
    },
  },
});

export const { setProductInfo } = productSlice.actions;

export default productSlice.reducer;
