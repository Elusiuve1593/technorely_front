import { memo } from "react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { SignUpFormInterface } from "../SignUp";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { BlindButton } from "../../../../common/components/BlindButton";
import { AuthButton } from "../../../../common/components/AuthButton";
import { AccountButton } from "../../../../common/components/AccountButton";

interface SignUpFormProps {
  register: UseFormRegister<SignUpFormInterface>;
  handleSubmit: UseFormHandleSubmit<SignUpFormInterface, undefined>;
  errors: FieldErrors<SignUpFormInterface>;
  onSubmit: SubmitHandler<SignUpFormInterface>;
  isValid: boolean;
  blind: boolean;
  setBlind: (blind: boolean) => void;
}

export const SignUpForm = memo(
  ({
    register,
    handleSubmit,
    errors,
    onSubmit,
    isValid,
    blind,
    setBlind,
  }: SignUpFormProps) => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" sx={{ marginTop: 1 }} gutterBottom>
          Sign up
        </Typography>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            {...register("email")}
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 1 }}>
          <InputLabel>Password</InputLabel>
          <Input
            {...register("password")}
            type={blind ? "password" : "text"}
            error={!!errors.password}
            endAdornment={<BlindButton blind={blind} setBlind={setBlind} />}
          />
          <FormHelperText error>{errors.password?.message}</FormHelperText>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            {...register("phone_number")}
            label="Phone number"
            type="tel"
            error={!!errors.phone_number}
            helperText={errors.phone_number?.message}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            {...register("first_name")}
            label="First name"
            type="text"
            error={!!errors.first_name}
            helperText={errors.first_name?.message}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            {...register("last_name")}
            label="Last name"
            type="text"
            error={!!errors.last_name}
            helperText={errors.last_name?.message}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            {...register("nick_name")}
            label="Nickname"
            type="text"
            error={!!errors.nick_name}
            helperText={errors.nick_name?.message}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            {...register("description")}
            label="Description"
            multiline
            rows={2}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            {...register("position")}
            label="Position"
            error={!!errors.position}
            helperText={errors.position?.message}
          />
        </FormControl>

        <AuthButton isValid={isValid} text={"Sign up"} />
        <AccountButton
          text={"Already have an account?"}
          direction={"/"}
          page={"Sign In"}
        />
      </form>
    );
  }
);
