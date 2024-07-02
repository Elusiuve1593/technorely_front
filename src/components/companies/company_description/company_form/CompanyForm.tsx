import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { memo } from "react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import { useDispatch } from "react-redux";
import { CancelButton } from "../../../../common/components/CancelButton";
import { SaveButton } from "../../../../common/components/SaveButton";
import { updateCompanyThunk } from "../../../../redux/slices/profile/companies/operations";
import { CompaniesInterface } from "../../../../redux/slices/profile/companies/slice";
import { AppDispatch } from "../../../../redux/store";

interface CompanyFromProps {
  id: string | undefined;
  register: UseFormRegister<CompaniesInterface>;
  handleSubmit: UseFormHandleSubmit<CompaniesInterface, undefined>;
  errors: FieldErrors<CompaniesInterface>;
  setEdit: (edit: boolean) => void;
  edit: boolean;
  reset: UseFormReset<CompaniesInterface>;
  company: CompaniesInterface | undefined;
  toggleEditCompany: () => void;
}

export const CompanyFrom = memo(
  ({
    id,
    register,
    handleSubmit,
    errors,
    setEdit,
    edit,
    reset,
    company,
    toggleEditCompany,
  }: CompanyFromProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const onSubmit: SubmitHandler<CompaniesInterface> = async (data) => {
      const {
        address,
        description,
        name,
        number_of_employees,
        service_of_activity,
        type,
      } = data;

      await dispatch(
        updateCompanyThunk({
          id: id,
          company: {
            address,
            description,
            name,
            number_of_employees,
            service_of_activity,
            type,
          },
        })
      );

      setEdit(!edit);
      reset();
    };

    return (
      <Paper
        elevation={1}
        sx={{ padding: 2, background: "#fff", borderRadius: 2 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={1.5}>
            <Box textAlign="center">
              <h1>{company && company.name}</h1>
            </Box>
            <TextField
              {...register("name")}
              label="Name"
              fullWidth
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
            />
            <TextField
              {...register("address")}
              label="Address"
              fullWidth
              variant="outlined"
              error={!!errors.address}
              helperText={errors.address ? errors.address.message : ""}
            />
            <TextField
              {...register("service_of_activity")}
              label="Service of Activity"
              fullWidth
              variant="outlined"
              error={!!errors.service_of_activity}
              helperText={
                errors.service_of_activity
                  ? errors.service_of_activity.message
                  : ""
              }
            />
            <TextField
              {...register("number_of_employees")}
              label="Number of Employees"
              type="number"
              defaultValue={1}
              inputProps={{ inputMode: "numeric", min: "1" }}
              fullWidth
              variant="outlined"
              error={!!errors.number_of_employees}
              helperText={
                errors.number_of_employees
                  ? errors.number_of_employees.message
                  : ""
              }
            />
            <TextField
              {...register("description")}
              label="Description"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ""}
            />
            <TextField
              {...register("type")}
              label="Type"
              fullWidth
              variant="outlined"
              error={!!errors.type}
              helperText={errors.type ? errors.type.message : ""}
            />
            <Box display="flex" justifyContent="space-between" mt={2} gap={2}>
              <CancelButton callback={toggleEditCompany} />
              <SaveButton text={"Save changes"} buttonType={"submit"}/>
            </Box>
          </Box>
        </form>
      </Paper>
    );
  }
);
