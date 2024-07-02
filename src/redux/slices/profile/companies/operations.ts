import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleAxiosError } from "../../../../common/errors_handler/errors_handler";
import axiosInstance from "../../../axios_interceptor";
import { isLoading } from "../../preloader/slice";
import {
  CompaniesInterface,
  createCompany,
  deleteCompany,
  fetchCompanies,
  getCompany,
  updateCompany,
} from "./slice";

export const fetchCompaniesThunk = createAsyncThunk(
  "companies/companiesThunk",
  async (
    params: { sortBy: string; order: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(isLoading({ setPreloading: true }));
      const res = await axiosInstance.get<CompaniesInterface[]>(
        `${import.meta.env.VITE_API_URL}/companies?sortBy=${
          params.sortBy
        }&order=${params.order}`
      );
      dispatch(fetchCompanies({ companies: res.data }));
    } catch (err: any) {
      return handleAxiosError(err, rejectWithValue);
    } finally {
      dispatch(isLoading({ setPreloading: false }));
    }
  }
);

export const fetchCompanyThunk = createAsyncThunk(
  "companies/companiesThunk",
  async (id: string | undefined, { dispatch, rejectWithValue }) => {
    try {
      dispatch(isLoading({ setPreloading: true }));
      const res = await axiosInstance.get<CompaniesInterface>(
        `${import.meta.env.VITE_API_URL}/companies/${Number(id)}`
      );
      dispatch(getCompany({ company: res.data }));
    } catch (err: any) {
      handleAxiosError(err, rejectWithValue);
    } finally {
      dispatch(isLoading({ setPreloading: false }));
    }
  }
);

export const createCompanyThunk = createAsyncThunk(
  "companies/companiesThunk",
  async (company: CompaniesInterface, { dispatch, rejectWithValue }) => {
    try {
      dispatch(isLoading({ setPreloading: true }));
      const id = localStorage.getItem("id");
      const res = await axiosInstance.post<CompaniesInterface>(
        `${import.meta.env.VITE_API_URL}/companies/${id}`,
        company
      );
      dispatch(createCompany({ company: res.data }));
    } catch (err: any) {
      handleAxiosError(err, rejectWithValue);
    } finally {
      dispatch(isLoading({ setPreloading: false }));
    }
  }
);

export const updateCompanyThunk = createAsyncThunk(
  "companies/companiesThunk",
  async (
    params: { id: string | undefined; company: CompaniesInterface },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(isLoading({ setPreloading: true }));
      const updatedCompany = await axiosInstance.put<CompaniesInterface>(
        `${import.meta.env.VITE_API_URL}/companies/${params.id}`,
        params.company
      );
      dispatch(
        updateCompany({
          companyId: Number(params.id),
          company: updatedCompany.data,
        })
      );
    } catch (err: any) {
      handleAxiosError(err, rejectWithValue);
    } finally {
      dispatch(isLoading({ setPreloading: false }));
    }
  }
);

export const deleteCompanyThunk = createAsyncThunk(
  "companies/companiesThunk",
  async (id: number | undefined, { dispatch, rejectWithValue }) => {
    try {
      dispatch(isLoading({ setPreloading: true }));
      await axiosInstance.delete<CompaniesInterface>(
        `${import.meta.env.VITE_API_URL}/companies/${id}`
      );
      dispatch(deleteCompany({ companyId: id }));
    } catch (err: any) {
      handleAxiosError(err, rejectWithValue);
    } finally {
      dispatch(isLoading({ setPreloading: false }));
    }
  }
);
