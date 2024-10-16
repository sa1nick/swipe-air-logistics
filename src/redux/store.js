import {configureStore} from '@reduxjs/toolkit';
import authApiReducer from '../api/slice/authSlice/authApiSlice';
import warehouseApiReducer from '../api/slice/warehouseSlice/warehouseApiSlice';
import storeDataGloballyReducer from '../api/slice//storeDataGloballySlice/storeDataGloballySlice';

export default configureStore({
  reducer: {
    auth: authApiReducer,
    warehouse: warehouseApiReducer,
    storeDataGlobally: storeDataGloballyReducer
  },
});
