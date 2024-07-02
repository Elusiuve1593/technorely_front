import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GoToButton } from "../../../common/components/GoToButton";
import { ButtonStyle } from "../../../common/styles/styles";
import { useAppSelector } from "../../../redux/redux_hooks";
import { fetchCompanyThunk } from "../../../redux/slices/profile/companies/operations";
import { CompaniesInterface } from "../../../redux/slices/profile/companies/slice";
import { AppDispatch, RootState } from "../../../redux/store";
import { schema } from "../yup/yup";
import { CompanyBody } from "./company_body/CompanyBody";
import { CompanyFrom } from "./company_form/CompanyForm";

export const CompanyDescription = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const companies = useAppSelector((state: RootState) => state.companies);
  const company = companies.find((company) => company.id === Number(id));
  const [edit, setEdit] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompaniesInterface>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const toggleEditCompany = () => {
    if (!edit && company) {
      reset({
        name: company.name,
        address: company.address,
        service_of_activity: company.service_of_activity,
        number_of_employees: company.number_of_employees,
        description: company.description,
        type: company.type,
      });
    }
    setEdit(!edit);
  };

  useEffect(() => {
    if (!company) {
      dispatch(fetchCompanyThunk(id));
    }
  }, [dispatch, id, company]);

  if (!company) {
    return null;
  }

  return (
    <Box mt={3} mx={2}>
      <Box sx={{ display: "flex", paddingBottom: "15px" }}>
        <Grid item>
          <GoToButton
            text={"Table"}
            direction={"/companies"}
            style={ButtonStyle}
          />
        </Grid>
      </Box>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          marginBottom: 3,
          maxWidth: "450px",
          borderRadius: "0",
        }}
      >
        {edit ? (
          <CompanyFrom
            id={id}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            edit={edit}
            setEdit={setEdit}
            reset={reset}
            company={company}
            toggleEditCompany={toggleEditCompany}
          />
        ) : (
          <CompanyBody
            company={company}
            toggleEditCompany={toggleEditCompany}
          />
        )}
      </Paper>
    </Box>
  );
};
