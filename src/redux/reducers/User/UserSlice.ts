import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OneUser } from "../../../types/types"
import { editProfile, getOneUser, loginUser, loginWithFacebook, loginWithGoogle, registerUser } from "./UserActions";
import { addDataToLocalStorage, isUserLogin } from "../../../helpers/functions";

interface UserState {
  users: OneUser[];
  oneUser: OneUser | null;
  loading: boolean;
  status: string;
  modalOpen: boolean;
}
const initialState: UserState = {
  users: [],
  oneUser: null,
  loading: false,
  status: '',
  modalOpen: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    openModal: (state) => {
      state.modalOpen = true;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.modalOpen = false;
      console.log(action.payload)
      action.payload.user.getIdToken().then((elem) => addDataToLocalStorage(action.payload.user.uid, elem));
      action.payload.navigate('/home')
      state.oneUser = action.payload.userRes as OneUser;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
    })
    .addCase(loginWithGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.modalOpen = false;
      console.log(action.payload)
      action.payload?.user.getIdToken().then((elem: any) => addDataToLocalStorage(action.payload?.user.uid, elem));
      action.payload?.navigate('/home')
      state.oneUser = action.payload?.user as OneUser;
    })
    .addCase(loginWithGoogle.rejected, (state, action) => {
      state.loading = false;
    })
    .addCase(loginWithFacebook.fulfilled, (state, action) => {
      state.loading = false;
      state.modalOpen = false;
      console.log(action.payload)
      action.payload?.user.getIdToken().then((elem: any) => addDataToLocalStorage(action.payload?.user.uid, elem));
      action.payload?.navigate('/home')
      //state.oneUser = action.payload.user 
    })
    .addCase(loginWithFacebook.rejected, (state, action) => {
      state.loading = false;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.modalOpen = false;
      console.log(action.payload)
      action.payload.user.getIdToken().then((elem) => addDataToLocalStorage(action.payload.user.uid, elem));
      action.payload.navigate('/home')
      state.oneUser = action.payload.userRes as OneUser;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
    })
    .addCase(getOneUser.pending, (state, action) => {
      state.loading = true;
      state.status = '';
    })
    .addCase(getOneUser.fulfilled, (state, action) => {
      state.loading = false;
      state.modalOpen = false;
      //console.log(action.payload)
      state.oneUser = action.payload?.user as OneUser;
    })
    .addCase(getOneUser.rejected, (state, action) => {
      state.loading = false;
    })
    .addCase(editProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.modalOpen = false;
      state.oneUser = action.payload?.updatedUser as OneUser;
      action.payload?.navigate(`/user/${action.payload.updatedUser.username}`)
    })
    .addCase(editProfile.rejected, (state, action) => {
      state.loading = false;
    })
  }
})

export const { openModal } = userSlice.actions;
export default userSlice.reducer