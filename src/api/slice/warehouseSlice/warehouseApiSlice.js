import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

import {showAlert} from '../../../utils/Utils';

import {
  Get_All_Warehouse,
  Get_All_Product_By_Warehouse_Id,
  Move_WareHouse,
  Get_All_Product_By_Pickup_Dropoff_Warehouse,
  Update_Product_Tracking_Details_Status,
  Add_Box_Detail,
  Get_Box_List,
  Add_Box_To_Pallet_Detail,
  Add_Pallet_To_Container_Detail,
  Add_Container_Detail,
  Get_Pallet_List,
  Get_All_Container_List,
  Get_Product_List_By_BoxId,
  Get_Box_List_By_PalletId,
  Add_Box_To_Container_Detail,
  Get_All_Logistic_Drivers,
  Add_Assignmentof_Box,
  Add_Assignmentof_Pallet,
  Add_Assignmentof_Container,
  Get_Assign_Driver_Item_List,
  Get_Container_Type,
  Get_Container_Type_Dimension_By_Id,
  Get_Driver_Assignment_List,
  Get_Consignment_List,
  Get_Assignment_Detail
} from '../../endPoints';

// Define your async API call using Axios

export const getAllWarehouseApi = createAsyncThunk(
  'warehouseApiSlice/getAllWarehouseApi',
  async (params, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(Get_All_Warehouse);
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);

export const getAllProductByWarehouseIdApi = createAsyncThunk(
  'warehouseApiSlice/getAllProductByWarehouseIdApi',
  async (params, {rejectWithValue}) => {
    console.log('params: ',params)
    try {
      const response = await axiosInstance.post(
        Get_All_Product_By_Warehouse_Id,
        params,
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      console.log('err: ', errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const moveToWarehouseApi = createAsyncThunk(
  'warehouseApiSlice/moveToWarehouseApi',
  async (params, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(Move_WareHouse, params);
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);

export const getAllPendingProductWarehouseApi = createAsyncThunk(
  'warehouseApiSlice/getAllPendingProductWarehouseApi',
  async (params, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(
        Get_All_Product_By_Pickup_Dropoff_Warehouse,
        params,
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      showAlert(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const getAllScannedProductWarehouseApi = createAsyncThunk(
  'warehouseApiSlice/getAllScannedProductWarehouseApi',
  async (params, {rejectWithValue}) => {
    console.log("params sc: ", params)
    try {
      const response = await axiosInstance.post(
        Get_All_Product_By_Pickup_Dropoff_Warehouse,
        params,
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      showAlert(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const updateProductStatusApi = createAsyncThunk(
  'warehouseApiSlice/updateProductStatusApi',
  async (params, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(
        Update_Product_Tracking_Details_Status,
        params,
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      console.log('err: ', errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const createBoxApi = createAsyncThunk(
  'warehouseApiSlice/createBoxApi',
  async (params, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(Add_Box_Detail, params);
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      console.log('err: ', errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const getBoxListApi = createAsyncThunk(
  'warehouseApiSlice/getBoxListApi',
  async (params, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(Get_Box_List, params);
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);

export const getBoxDetailListApi = createAsyncThunk(
  'warehouseApiSlice/getBoxDetailListApi',
  async (params, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `${Get_Product_List_By_BoxId}?BoxId=${params.boxId}&PageNumber=${params.pageNumber}&PageSize=${params.pageSize}`,
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);

export const createPalletApi = createAsyncThunk(
  'warehouseApiSlice/createPalletApi',
  async (params, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(
        Add_Box_To_Pallet_Detail,
        params,
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      console.log('err: ', errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const getPalletListApi = createAsyncThunk(
  'warehouseApiSlice/getPalletListApi',
  async (params, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(Get_Pallet_List, params);
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);

export const getPalletDetailListApi = createAsyncThunk(
  'warehouseApiSlice/getPalletDetailListApi',
  async (params, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `${Get_Box_List_By_PalletId}?PalletId=${params.palletId}&PageNumber=${params.pageNumber}&PageSize=${params.pageSize}`,
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);

export const createBoxToContainerApi = createAsyncThunk(
  'warehouseApiSlice/createBoxToContainerApi',
  async (params, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(
        Add_Box_To_Container_Detail,
        params,
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      console.log('err: ', errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const createPalletToContainerApi = createAsyncThunk(
  'warehouseApiSlice/createPalletToContainerApi',
  async (params, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(
        Add_Pallet_To_Container_Detail,
        params,
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      console.log('err: ', errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const addContainerDetailApi = createAsyncThunk(
  'warehouseApiSlice/addContainerDetailApi',
  async (params, {rejectWithValue}) => {
    console.log('addparams: ', params)
    try {
      const response = await axiosInstance.post(
        Add_Container_Detail,
        params,
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      console.log('err: ', errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const getAllContainerListApi = createAsyncThunk(
  'warehouseApiSlice/getAllContainerListApi',
  async (params, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(Get_All_Container_List, params);
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);

export const getAllDriverListApi = createAsyncThunk(
  'warehouseApiSlice/getAllDriverListApi',
  async (params, {rejectWithValue}) => {
    console.log('params: ', params)
    try {
      const response = await axiosInstance.post(
        Get_All_Logistic_Drivers,
        params,
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);

export const assignToDriverApi = createAsyncThunk(
  'warehouseApiSlice/assignToDriverApi',
  async (params, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(
        params.index === 1 ? Add_Assignmentof_Box : params.index === 2 ? Add_Assignmentof_Pallet : Add_Assignmentof_Container,
        params,
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      console.log('err: ', errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const getAssignedItemToDriver = createAsyncThunk(
  'warehouseApiSlice/getAssignedItemToDriver',
  async (params, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(
        Get_Assign_Driver_Item_List,
        params,
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      console.log('err: ', errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const getContainerTypeApi = createAsyncThunk(
  'warehouseApiSlice/getContainerTypeApi',
  async (params, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `${Get_Container_Type}`,
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);

export const getContainerTypeDimensionByIdApi = createAsyncThunk(
  'warehouseApiSlice/getContainerTypeDimensionByIdApi',
  async (params, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `${Get_Container_Type_Dimension_By_Id}?ContainerTypeId=${params.containerTypeId}`,
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);

export const getDriverAssignmentListApi = createAsyncThunk(
  'warehouseApiSlice/getDriverAssignmentListApi',
  async (params, {rejectWithValue}) => {
    console.log('params sss: ', params)
    try {
      const response = await axiosInstance.get(
        `${Get_Driver_Assignment_List}?Status=${params.status}`,
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);

export const getConsignmentListApi = createAsyncThunk(
  'warehouseApiSlice/getConsignmentListApi',
  async (params, {rejectWithValue}) => {
    console.log('params sss: ', params)
    try {
      const response = await axiosInstance.get(
        `${Get_Consignment_List}?AssignmentId=${params.assignmentId}`,
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);

export const getAssignmentDetailApi = createAsyncThunk(
  'warehouseApiSlice/getAssignmentDetailApi',
  async (params, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(
        Get_Assignment_Detail,
        params,
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network error, Please try again.';
      return rejectWithValue(errorMessage);
    }
  },
);

// Create the slice
const warehouseApiSlice = createSlice({
  name: 'warehouseApiSlice',
  initialState: {
    warehouseList: null,
    productList: null,
    moveToWarehouse: null,
    pendingProductByPickupDropoffWarehouse: null,
    scannedProductByPickupDropoffWarehouse: null,
    updateProductStatus: null,
    createBox: null,
    boxList: null,
    detailBoxList: null,
    createPallet: null,
    palletList: null,
    detailPalletList: null,
    createContainer: null,
    containerList: null,
    driverList: null,
    assignDriver: null,
    assignDriverItemList: null,
    containerType: null,
    containerTypeError: null,
    containerTypeDimension: null,
    containerTypeDimensionError: null,
    driverAssignmentList: null,
    consignmentList: null,
    assignmentDetailList: null,
    status: 'idle',
    error: null,
    detailBoxListError: null,
    detailPalletListError: null,
    containerListError: null,
    containerTypeError: null,
    driverAssignmentError: null,
    consignmentError: null,
    assignmentDetailError: null
  },
  reducers: {
    clearAuthDetails: state => {
      state.warehouseList = null;
      state.productList = null;
      state.moveToWarehouse = null;
      state.pendingProductByPickupDropoffWarehouse = null;
      state.scannedProductByPickupDropoffWarehouse = null;
      state.updateProductStatus = null;
      state.createBox = null;
      state.boxList = null;
      state.createPallet = null;
      state.palletList = null;
      state.containerList = null;
      state.driverList = null;
      state.assignDriverItemList = null;
      state.containerType = null;
      state.status = 'idle';
      state.error = null;
    },
    clearScannedDetails: state => {
      state.updateProductStatus = null;
    },
    clearBPCList: state => {
      state.boxList = null;
      state.palletList = null;
      state.containerList = null;
      state.error = null;
    },
    clearDetailBoxList: state => {
      state.detailBoxList = null;
      state.detailBoxListError = null;
    },
    clearDetailPalletList: state => {
      state.detailPalletList = null;
      state.detailPalletListError = null;
    },
    clearCreateBPC: state => {
      state.createBox = null;
      state.createPallet = null;
      state.createContainer = null;
      state.error = null;
    },
    clearDriverList: state => {
      state.driverList = null;
    },
    clearAssignDriver: state => {
      state.assignDriver = null;
    },
    clearContainerType: state => {
      state.containerTypeError = null;
      state.containerType = null;
      state.containerTypeDimension = null;
      state.containerTypeDimensionError = null;
    },
    clearDriverAssignment: state => {
      state.driverAssignmentList = null;
      state.driverAssignmentError = null;
    },
    clearConsignmentList: state => {
      state.consignmentList = null;
      state.consignmentError = null;
    },
    clearConsignmentDetailList: state => {
      state.assignmentDetailList = null;
      state.assignmentDetailError = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllWarehouseApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.warehouseList = action.payload;
        state.error = null;
      })
      .addCase(getAllWarehouseApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getAllProductByWarehouseIdApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productList = action.payload;
        state.error = null;
      })
      .addCase(getAllProductByWarehouseIdApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(moveToWarehouseApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.moveToWarehouse = action.payload;
        state.error = null;
      })
      .addCase(moveToWarehouseApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getAllPendingProductWarehouseApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pendingProductByPickupDropoffWarehouse = action.payload;
        state.error = null;
      })
      .addCase(getAllPendingProductWarehouseApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getAllScannedProductWarehouseApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.scannedProductByPickupDropoffWarehouse = action.payload;
        state.error = null;
      })
      .addCase(getAllScannedProductWarehouseApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateProductStatusApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.updateProductStatus = action.payload;
        state.error = null;
      })
      .addCase(updateProductStatusApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createBoxApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.createBox = action.payload;
        state.error = null;
      })
      .addCase(createBoxApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getBoxListApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.boxList = action.payload;
        state.error = null;
      })
      .addCase(getBoxListApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getBoxDetailListApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.detailBoxList = action.payload;
        state.error = null;
      })
      .addCase(getBoxDetailListApi.rejected, (state, action) => {
        state.status = 'failed';
        state.detailBoxListError = action.payload;
      })
      .addCase(createPalletApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.createPallet = action.payload;
        state.error = null;
      })
      .addCase(createPalletApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getPalletListApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.palletList = action.payload;
        state.error = null;
      })
      .addCase(getPalletListApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getPalletDetailListApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.detailPalletList = action.payload;
        state.error = null;
      })
      .addCase(getPalletDetailListApi.rejected, (state, action) => {
        state.status = 'failed';
        state.detailPalletListError = action.payload;
      })
      .addCase(createBoxToContainerApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.createContainer = action.payload;
        state.error = null;
      })
      .addCase(createBoxToContainerApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createPalletToContainerApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.createContainer = action.payload;
        state.error = null;
      })
      .addCase(createPalletToContainerApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addContainerDetailApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.createContainer = action.payload;
        state.error = null;
      })
      .addCase(addContainerDetailApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getAllContainerListApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.containerList = action.payload;
        state.error = null;
      })
      .addCase(getAllContainerListApi.rejected, (state, action) => {
        state.status = 'failed';
        state.containerListError = action.payload;
      })
      .addCase(getAllDriverListApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.driverList = action.payload;
        state.error = null;
      })
      .addCase(getAllDriverListApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(assignToDriverApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.assignDriver = action.payload;
        state.error = null;
      })
      .addCase(assignToDriverApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getAssignedItemToDriver.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.assignDriverItemList = action.payload;
        state.error = null;
      })
      .addCase(getAssignedItemToDriver.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getContainerTypeApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.containerType = action.payload;
        state.error = null;
      })
      .addCase(getContainerTypeApi.rejected, (state, action) => {
        state.status = 'failed';
        state.containerTypeError = action.payload;
      })
      .addCase(getContainerTypeDimensionByIdApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.containerTypeDimension = action.payload;
        state.error = null;
      })
      .addCase(getContainerTypeDimensionByIdApi.rejected, (state, action) => {
        state.status = 'failed';
        state.containerTypeDimensionError = action.payload;
      })
      .addCase(getDriverAssignmentListApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.driverAssignmentList = action.payload;
        state.error = null;
      })
      .addCase(getDriverAssignmentListApi.rejected, (state, action) => {
        state.status = 'failed';
        state.driverAssignmentError = action.payload;
      })
      .addCase(getConsignmentListApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.consignmentList = action.payload;
        state.error = null;
      })
      .addCase(getConsignmentListApi.rejected, (state, action) => {
        state.status = 'failed';
        state.consignmentError = action.payload;
      })
      .addCase(getAssignmentDetailApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.assignmentDetailList = action.payload;
        state.error = null;
      })
      .addCase(getAssignmentDetailApi.rejected, (state, action) => {
        state.status = 'failed';
        state.assignmentDetailError = action.payload;
      })
      ;
  },
});

export const {
  clearScannedDetails,
  clearDetailBoxList,
  clearDetailPalletList,
  clearCreateBPC,
  clearBPCList,
  clearDriverList,
  clearAssignDriver,
  clearContainerType,
  clearDriverAssignment,
  clearConsignmentList,
  clearConsignmentDetailList
} = warehouseApiSlice.actions;

export default warehouseApiSlice.reducer;
