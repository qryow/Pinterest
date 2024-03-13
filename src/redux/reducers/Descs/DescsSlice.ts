import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDesc, IPin } from "../../../types/types";
import { createDesc, getOneDesc, getOwnDescs } from "./DescsActions";
import { getPinById } from "../Pins/PinsAction";

interface PinState {
  descs: IDesc[];
  oneDesc: IDesc | null;
  descLoading: boolean;
  status: string;
  modalOpen: boolean;
}
const initialState: PinState = {
  descs: [],
  oneDesc: null,
  descLoading: false,
  status: '',
  modalOpen: false,
}

export const descsSlice = createSlice({
  name: 'pin',
  initialState,
  reducers: {
    openModal: (state) => {
      state.modalOpen = true;
    }
  },
  extraReducers: (builder) => {
    builder 
    .addCase(createDesc.fulfilled, (state, action) => {
      state.modalOpen = false;
      state.descs = action.payload.descs as IDesc[];
    })
    .addCase(getOwnDescs.pending, (state) => {
      state.descLoading = true;
    })
    .addCase(getOwnDescs.fulfilled, (state, action) => {
      state.descLoading = false;
      state.descs = action.payload.descs;
    })
    .addCase(getOwnDescs.rejected, (state) => {
      state.descLoading = false;
    })
    .addCase(getOneDesc.fulfilled, (state, action) => {
      state.descLoading = false;
      state.oneDesc = action.payload.descRes as IDesc;
    })
  }
})

export const { openModal } = descsSlice.actions;
export default descsSlice.reducer