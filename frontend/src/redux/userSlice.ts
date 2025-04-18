import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  userLogin: boolean;
  userId: string;
  userRole: string;
};

const initialState: UserState = {
  userLogin: false,
  userId: "",
  userRole: "User",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogin(state, action: PayloadAction<boolean>) {
      state.userLogin = action.payload;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    setUserRole(state, action: PayloadAction<string>) {
      state.userRole = action.payload;
    },
  },
});

export const { setUserLogin, setUserId, setUserRole } = userSlice.actions;
export default userSlice.reducer;
