import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { GoToButton } from "../../../common/components/GoToButton";
import { ButtonStyle, style } from "../../../common/styles/styles";
import { useAppSelector } from "../../../redux/redux_hooks";
import {
  fetchCompaniesByAdminThunk,
  updateCompanyByAdminThunk,
} from "../../../redux/slices/admin/companies/operations";
import { CompaniesInterface } from "../../../redux/slices/profile/companies/slice";
import { AppDispatch, RootState } from "../../../redux/store";
import { schema } from "../../companies/yup/yup";
import { CompanyBodyList } from "./company_body/CompanyBodyList";
import { CompaniesListForm } from "./company_form/CompaniesListForm";

export const CompaniesList = () => {
  const companies: CompaniesInterface[] = useAppSelector(
    (state: RootState) => state.companies
  );
  const dispatch = useDispatch<AppDispatch>();
  const [editCompanyId, setEditCompanyId] = useState<number | null | undefined>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompaniesInterface>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const handleEdit = (companyId: number | undefined) => {
    if (editCompanyId === companyId) {
      setEditCompanyId(null);
    }
    const companyToEdit = companies.find((company) => company.id === companyId);
    if (companyToEdit) {
      setEditCompanyId(companyId);
      reset({
        name: companyToEdit.name,
        address: companyToEdit.address,
        number_of_employees: companyToEdit.number_of_employees,
        description: companyToEdit.description,
        service_of_activity: companyToEdit.service_of_activity,
        type: companyToEdit.type,
      });
    }
  };

  const onSubmit: SubmitHandler<CompaniesInterface> = async (data) => {
    if (editCompanyId) {
      try {
        await dispatch(
          updateCompanyByAdminThunk({ id: editCompanyId, company: data })
        ).unwrap();
        await dispatch(fetchCompaniesByAdminThunk());
      } catch (error) {
        toast.error("Failed to update company: ", { style });
      }
    }
    setEditCompanyId(null);
    reset();
  };

  const onCancelEdit = () => {
    setEditCompanyId(null);
    reset();
  };

  useEffect(() => {
    dispatch(fetchCompaniesByAdminThunk());
  }, [dispatch]);

  return (
    <Box sx={{ padding: "16px", backgroundColor: "#f9f9f9" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <GoToButton
          text={"Profile"}
          direction={"/profile"}
          style={ButtonStyle}
        />
      </Box>
      <Grid container spacing={3} mt={3} sx={{ maxWidth: "780px" }}>
        {!companies.length ? (
          <Grid item xs={12}>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              No companies available yet
            </Typography>
          </Grid>
        ) : (
          companies.map(
            (
              {
                id,
                name,
                address,
                number_of_employees,
                description,
                service_of_activity,
                type,
              },
              index
            ) => (
              <Grid
                item
                sx={{ minWidth: "390px", maxWidth: "100%" }}
                key={index}
              >
                <Paper
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "16px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                  }}
                >
                  {editCompanyId === id ? (
                    <CompaniesListForm
                      onSubmit={onSubmit}
                      handleSubmit={handleSubmit}
                      register={register}
                      errors={errors}
                      onCancelEdit={onCancelEdit}
                    />
                  ) : (
                    <CompanyBodyList
                      id={id}
                      name={name}
                      address={address}
                      number_of_employees={number_of_employees}
                      description={description}
                      service_of_activity={service_of_activity}
                      type={type}
                      handleEdit={handleEdit}
                    />
                  )}
                </Paper>
              </Grid>
            )
          )
        )}
      </Grid>
    </Box>
  );
};
