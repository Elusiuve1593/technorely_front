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
import { useDispatch } from "react-redux";
import { CancelButton } from "../../../../common/components/CancelButton";
import { SaveButton } from "../../../../common/components/SaveButton";
import {
  profileThunk,
  updateProfileThunk,
} from "../../../../redux/slices/profile/user/operations";
import { ProfileInterface } from "../../../../redux/slices/profile/user/slice";
import { AppDispatch } from "../../../../redux/store";

interface ProfileFormProps {
  id: string | null;
  register: UseFormRegister<ProfileInterface>;
  handleSubmit: UseFormHandleSubmit<ProfileInterface, undefined>;
  errors: FieldErrors<ProfileInterface>;
  setIsEditing: (isEditing: boolean) => void;
  toggleEditProfile: () => void;
}

export const ProfileForm = memo(
  ({
    id,
    register,
    handleSubmit,
    errors,
    setIsEditing,
    toggleEditProfile,
  }: ProfileFormProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit: SubmitHandler<ProfileInterface> = async (data) => {
      if (id) {
        await dispatch(updateProfileThunk({ id: +id, profile: data }));
        await dispatch(profileThunk(+id));
      }
      setIsEditing(false);
    };

    return (
      <Paper
        elevation={1}
        sx={{ padding: 1, background: "#fff", borderRadius: 2 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={1.5}>
            <TextField
              {...register("first_name")}
              label="First Name"
              fullWidth
              variant="outlined"
              error={!!errors.first_name}
              helperText={errors.first_name ? errors.first_name.message : ""}
            />
            <TextField
              {...register("last_name")}
              label="Last Name"
              fullWidth
              variant="outlined"
              error={!!errors.last_name}
              helperText={errors.last_name ? errors.last_name.message : ""}
            />
            <TextField
              {...register("nick_name")}
              label="Nick Name"
              fullWidth
              variant="outlined"
              error={!!errors.nick_name}
              helperText={errors.nick_name ? errors.nick_name.message : ""}
            />
            <TextField
              {...register("description")}
              label="Description"
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ""}
            />
            <TextField
              {...register("phone_number")}
              label="Phone Number"
              fullWidth
              variant="outlined"
              error={!!errors.phone_number}
              helperText={
                errors.phone_number ? errors.phone_number.message : ""
              }
            />
            <TextField
              {...register("position")}
              label="Position"
              fullWidth
              variant="outlined"
              error={!!errors.position}
              helperText={errors.position ? errors.position.message : ""}
            />
            <Box display="flex" justifyContent="space-between" mt={2} gap={2}>
              <CancelButton callback={toggleEditProfile} />
              <SaveButton text={"Save changes"} buttonType={"submit"} />
            </Box>
          </Box>
        </form>
      </Paper>
    );
  }
);
