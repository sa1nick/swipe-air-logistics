import {createSlice} from '@reduxjs/toolkit';

export const storeDataGloballySlice = createSlice({
  name: 'storeDataGloballySlice',
  initialState: {
    pickupWarehouse: null,
    dropoffWarehouse: null,
    validate: false,
  },
  reducers: {
    pickupWarehouse: (state, action) => {
      state.pickupWarehouse = action.payload;
    },
    dropoffWarehouse: (state, action) => {
      state.dropoffWarehouse = action.payload;
    },
    validate: (state, action) => {
      state.validate = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {pickupWarehouse, dropoffWarehouse, validate} =
  storeDataGloballySlice.actions;

export default storeDataGloballySlice.reducer;
