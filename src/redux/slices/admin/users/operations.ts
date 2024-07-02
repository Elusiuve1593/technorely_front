import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleAxiosError } from "../../../../common/errors_handler/errors_handler";
import axiosInstance from "../../../axios_interceptor";
import { isLoading } from "../../preloader/slice";
import { ProfileInterface } from "../../profile/user/slice";
import { fetchUsers, updateUser } from "./slice";

export const fetchUsersByAdminThunk = createAsyncThunk(
  "usersByAdmin/usersByAdminThunk",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(isLoading({ setPreloading: true }));
      const res = await axiosInstance.get<ProfileInterface[]>(
        `${import.meta.env.VITE_API_URL}/admin`
      );
      dispatch(fetchUsers({ users: res.data }));
    } catch (err: any) {
      return handleAxiosError(err, rejectWithValue, "profile");
    } finally {
      dispatch(isLoading({ setPreloading: false }));
    }
  }
);

export const updateUserThunkByAdmin = createAsyncThunk(
  "usersByAdmin/usersByAdminThunk",
  async (
    params: { id: number | undefined; user: ProfileInterface },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(isLoading({ setPreloading: true }));
      const updatedUser = await axiosInstance.put<ProfileInterface>(
        `${import.meta.env.VITE_API_URL}/admin/${params.id}`,
        params.user
      );
      dispatch(
        updateUser({
          userId: Number(params.id),
          user: updatedUser.data,
        })
      );
    } catch (err: any) {
      return handleAxiosError(err, rejectWithValue);
    } finally {
      dispatch(isLoading({ setPreloading: false }));
    }
  }
);
