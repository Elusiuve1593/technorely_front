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
import { ProfileInterface } from "../../../../redux/slices/profile/user/slice";

interface UserListFormProps {
  handleSubmit: UseFormHandleSubmit<ProfileInterface, undefined>;
  onSubmit: SubmitHandler<ProfileInterface>;
  register: UseFormRegister<ProfileInterface>;
  errors: FieldErrors<ProfileInterface>;
  first_name: string;
  last_name: string;
  nick_name: string;
  phone_number: string;
  position: string;
  onCancelEdit: () => void;
}

export const UserListForm = memo(
  ({
    handleSubmit,
    onSubmit,
    register,
    errors,
    first_name,
    last_name,
    nick_name,
    phone_number,
    position,
    onCancelEdit,
  }: UserListFormProps) => {
    return (
      <Paper
        elevation={1}
        sx={{ padding: 2, background: "#fff", borderRadius: 2 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              {...register("first_name")}
              label="First name"
              fullWidth
              variant="outlined"
              error={!!errors.first_name}
              helperText={errors.first_name ? errors.first_name.message : ""}
              defaultValue={first_name}
            />
            <TextField
              {...register("last_name")}
              label="Last name"
              fullWidth
              variant="outlined"
              error={!!errors.last_name}
              helperText={errors.last_name ? errors.last_name.message : ""}
              defaultValue={last_name}
            />
            <TextField
              {...register("nick_name")}
              label="Nickname"
              fullWidth
              variant="outlined"
              error={!!errors.nick_name}
              helperText={errors.nick_name ? errors.nick_name.message : ""}
              defaultValue={nick_name}
            />
            <TextField
              {...register("phone_number")}
              label="Phone number"
              type="number"
              fullWidth
              variant="outlined"
              error={!!errors.phone_number}
              helperText={
                errors.phone_number ? errors.phone_number.message : ""
              }
              defaultValue={phone_number}
            />
            <TextField
              {...register("position")}
              label="Position"
              fullWidth
              variant="outlined"
              error={!!errors.position}
              helperText={errors.position ? errors.position.message : ""}
              defaultValue={position}
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <CancelButton callback={onCancelEdit} />
              <SaveButton text={"Save changes"} buttonType={"submit"} />
            </Box>
          </Box>
        </form>
      </Paper>
    );
  }
);
