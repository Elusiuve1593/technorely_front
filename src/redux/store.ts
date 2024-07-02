import { ThunkAction, configureStore, Action } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/authentication/slice";
import profileSlice from "./slices/profile/user/slice";
import companySlice from "./slices/profile/companies/slice";
import preloaderSlice from "./slices/preloader/slice";
import profileByAdminSlice from "./slices/admin/users/slice";

const reducer = {
  auth: authSlice,
  profile: profileSlice,
  companies: companySlice,
  preloader: preloaderSlice,
  profileByAdmin: profileByAdminSlice,
};

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;
export default store;
