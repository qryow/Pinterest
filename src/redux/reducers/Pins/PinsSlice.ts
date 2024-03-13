import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPin } from "../../../types/types";
import { addComent, createPin, getOwnPins, getPinById, getRandomedPins } from "./PinsAction";

interface PinState {
  pins: IPin[];
  onePin: IPin | null;
  loading: boolean;
  status: string;
  modalOpen: boolean;
}
const initialState: PinState = {
  pins: [],
  onePin: null,
  loading: false,
  status: '',
  modalOpen: false,
}

export const userSlice = createSlice({
  name: 'pin',
  initialState,
  reducers: {
    //openModal: (state) => {
    //  state.modalOpen = true;
    //}
  },
  extraReducers: (builder) => {
    builder
    .addCase(createPin.pending, (state) => {
      state.loading = true;
    })
    .addCase(createPin.fulfilled, (state, action) => {
      state.loading = false;
      action.payload.navigate('/home')
    })
    .addCase(createPin.rejected, (state) => {
      state.loading = false;
    })
    .addCase(getRandomedPins.pending, (state) => {
      state.loading = true;
    })
    .addCase(getRandomedPins.fulfilled, (state, action) => {
      state.loading = false;
      state.pins = action.payload.randomPins as IPin[];
    })
    .addCase(getRandomedPins.rejected, (state) => {
      state.loading = false;
    })
    .addCase(getOwnPins.pending, (state) => {
      state.loading = true;
    })
    .addCase(getOwnPins.fulfilled, (state, action) => {
      state.loading = false;
      state.pins = action.payload.pins as IPin[];
    })
    .addCase(getOwnPins.rejected, (state) => {
      state.loading = false;
    })
    .addCase(getPinById.fulfilled, (state, action) => {
      state.onePin = action.payload.descRes as IPin;
    })
    .addCase(addComent.fulfilled, (state, action) => {
      state.onePin = action.payload.pinRes as IPin;
    })
  }
})

export const { } = userSlice.actions;
export default userSlice.reducer