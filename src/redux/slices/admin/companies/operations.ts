import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleAxiosError } from "../../../../common/errors_handler/errors_handler";
import axiosInstance from "../../../axios_interceptor";
import { isLoading } from "../../preloader/slice";
import {
  CompaniesInterface,
  fetchCompanies,
  updateCompany,
} from "../../profile/companies/slice";

export const fetchCompaniesByAdminThunk = createAsyncThunk(
  "companiesByAdmin/companiesByAdminThunk",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(isLoading({ setPreloading: true }));
      const res = await axiosInstance.get<CompaniesInterface[]>(
        `${import.meta.env.VITE_API_URL}/admin/companies`
      );
      dispatch(fetchCompanies({ companies: res.data }));
    } catch (err: any) {
      return handleAxiosError(err, rejectWithValue, "profile");
    } finally {
      dispatch(isLoading({ setPreloading: false }));
    }
  }
);

export const updateCompanyByAdminThunk = createAsyncThunk(
  "companiesByAdmin/companiesByAdminThunk",
  async (
    params: { id: number | undefined; company: CompaniesInterface },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(isLoading({ setPreloading: true }));
      const updatedCompany = await axiosInstance.put<CompaniesInterface>(
        `${import.meta.env.VITE_API_URL}/admin/company/${Number(params.id)}`,
        params.company
      );

      dispatch(
        updateCompany({
          companyId: params.id,
          company: updatedCompany.data,
        })
      );
    } catch (err: any) {
      return handleAxiosError(err, rejectWithValue);
    } finally {
      dispatch(isLoading({ setPreloading: false }));
    }
  }
);
