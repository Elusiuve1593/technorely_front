import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { memo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createCompanyThunk } from "../../../redux/slices/profile/companies/operations";
import { CompaniesInterface } from "../../../redux/slices/profile/companies/slice";
import { AppDispatch } from "../../../redux/store";
import { schema } from "../yup/yup";
import { CancelButton } from "../../../common/components/CancelButton";
import { SaveButton } from "../../../common/components/SaveButton";

export const CompanyModal = memo(
  ({ onCompanyCreated }: { onCompanyCreated: () => void }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const {
      register,
      handleSubmit,
      formState: { errors, isValid },
      reset,
    } = useForm<CompaniesInterface>({
      resolver: yupResolver(schema),
      mode: "onTouched",
    });

    const onSubmit: SubmitHandler<CompaniesInterface> = async (data) => {
      await dispatch(createCompanyThunk(data));
      closeModal();
      reset();
      onCompanyCreated();
    };
    return (
      <>
        <Button
          onClick={openModal}
          variant="contained"
          sx={{
            maxWidth: 230,
            padding: "10px 20px",
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
            color: "white",
          }}
        >
          Create Company
        </Button>
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          fullWidth
          maxWidth="xs"
          PaperProps={{
            sx: {
              bgcolor: "#FFFFFF",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "0",
            },
          }}
        >
          <DialogTitle sx={{ bgcolor: "#0b73e3", color: "white" }}>
            Company
          </DialogTitle>
          <DialogContent sx={{ marginTop: "25px" }}>
            <Paper
              elevation={1}
              sx={{ padding: 1, background: "#fff", borderRadius: 2 }}
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
                    rows={3}
                    variant="outlined"
                    error={!!errors.description}
                    helperText={
                      errors.description ? errors.description.message : ""
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
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    mt={2}
                    gap={1}
                  >
                    <CancelButton callback={closeModal} />
                    <SaveButton
                      text={"Create"}
                      buttonType={"submit"}
                      isValid={!isValid}
                    />
                  </Box>
                </Box>
              </form>
            </Paper>
          </DialogContent>
        </Dialog>
      </>
    );
  }
);
