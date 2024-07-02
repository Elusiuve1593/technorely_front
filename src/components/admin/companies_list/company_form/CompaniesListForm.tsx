import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { memo } from "react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { CancelButton } from "../../../../common/components/CancelButton";
import { SaveButton } from "../../../../common/components/SaveButton";
import { CompaniesInterface } from "../../../../redux/slices/profile/companies/slice";

interface CompaniesListFormProps {
  onSubmit: SubmitHandler<CompaniesInterface>;
  handleSubmit: UseFormHandleSubmit<CompaniesInterface, undefined>;
  register: UseFormRegister<CompaniesInterface>;
  errors: FieldErrors<CompaniesInterface>;
  onCancelEdit: () => void;
}

export const CompaniesListForm = memo(
  ({
    onSubmit,
    handleSubmit,
    register,
    errors,
    onCancelEdit,
  }: CompaniesListFormProps) => {
    return (
      <Paper
        elevation={1}
        sx={{ padding: 2, background: "#fff", borderRadius: 2 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={2}>
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
              {...register("number_of_employees")}
              label="Number of Employees"
              fullWidth
              variant="outlined"
              type="number"
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
              {...register("type")}
              label="Type"
              fullWidth
              variant="outlined"
              error={!!errors.type}
              helperText={errors.type ? errors.type.message : ""}
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <CancelButton callback={onCancelEdit} />
              <SaveButton text={"Save changes"} buttonType={"submit"}/>
            </Box>
          </Box>
        </form>
      </Paper>
    );
  }
);
