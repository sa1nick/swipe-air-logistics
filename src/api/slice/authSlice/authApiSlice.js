import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';
import { Login, Logistics_User_Types } from '../../endPoints';

// Define your async API call using Axios

export const logisticsUserTypesApi = createAsyncThunk(
  'authApiSlice/logisticsUserTypesApi',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(Logistics_User_Types);
      return response.data;
    } catch (error) {
      const errorMessage = error.response ? error.response.data : 'Network error, Please try again.';
      console.log('err: ', errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const loginApi = createAsyncThunk(
  'authApiSlice/postLoginData',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(Login, params);
      return response.data;
    } catch (error) {
      const errorMessage = error.response ? error.response.data : 'Network error, Please try again.';
      console.log('err: ', errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

// Create the slice
const authApiSlice = createSlice({
  name: 'authApiSlice',
  initialState: {
    data: null,
    logisticsUserTypesData: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearAuthDetails: state => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginApi.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      }).
      addCase(logisticsUserTypesApi.pending, state => {
        state.status = 'loading';
      })
      .addCase(logisticsUserTypesApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.logisticsUserTypesData = action.payload;
        state.error = null;
      })
      .addCase(logisticsUserTypesApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearAuthDetails } = authApiSlice.actions;

export default authApiSlice.reducer;
