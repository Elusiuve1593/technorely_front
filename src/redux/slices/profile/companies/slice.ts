import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CompaniesInterface {
  id?: number;
  name: string;
  address: string;
  service_of_activity: string;
  number_of_employees: number;
  description: string;
  type: string;
}

const initialState: CompaniesInterface[] = [
  {
    id: 0,
    name: "",
    address: "",
    service_of_activity: "",
    number_of_employees: 1,
    description: "",
    type: "",
  },
];

const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    fetchCompanies(
      _,
      action: PayloadAction<{ companies: CompaniesInterface[] }>
    ) {
      return action.payload.companies;
    },
    getCompany(state, action: PayloadAction<{ company: CompaniesInterface }>) {
      return state.map(() => action.payload.company);
    },
    createCompany(
      state,
      action: PayloadAction<{ company: CompaniesInterface }>
    ) {
      state.unshift(action.payload.company);
    },
    updateCompany(
      state,
      action: PayloadAction<{ companyId: number | undefined; company: CompaniesInterface }>
    ) {
      return state.map((company) =>
        company.id === action.payload.companyId
          ? action.payload.company
          : company
      );
    },
    deleteCompany(
      state,
      action: PayloadAction<{ companyId: number | undefined }>
    ) {
      return state.filter((company) => company.id !== action.payload.companyId);
    },
  },
});

export const {
  createCompany,
  fetchCompanies,
  deleteCompany,
  getCompany,
  updateCompany,
} = companySlice.actions;
export default companySlice.reducer;
